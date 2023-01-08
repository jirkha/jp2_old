from urllib import request
from django.http import HttpResponseBadRequest
from django.shortcuts import render
from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework.views import APIView
from django.views.decorators.csrf import csrf_exempt
from django.db.models import Sum
from rest_framework import status
from rest_framework.parsers import MultiPartParser, FormParser

from . models import ItemType, Item, ItemPart, Storage, Removal
from . models import ProductType, Product, SaleType, Sale, Transaction

from . serializers import MaterialTypeSerializer, MaterialSerializer, ItemPartSerializer, StorageSerializer, RemovalSerializer
from . serializers import ProductTypeSerializer, ProductSerializer, SaleTypeSerializer, SaleSerializer, TransactionSerializer

from .utils import (
    date_checker
)

### ITEMS ###

@csrf_exempt
@api_view(['POST'])
def itemType_add(request):
    data = request.data
    print(data)
    item = ItemType.objects.create(
        name=data['name'],
        note=data['note'],
    )
    i_ser = MaterialTypeSerializer(item, many=False)

    return Response(i_ser.data)


class ItemView(APIView):
    def get(self, request, *args, **kwargs):
        mt = Item.objects.all()
        m_ser = MaterialSerializer(mt, many=True)
        return Response(m_ser.data)
    

@api_view(['GET'])
def list_items(response):
    # mt = ItemType.objects.all()
    m = Item.objects.all().order_by("name")
    # st = Storage.objects.all()
    # r = Removal.objects.all()
    
    # print("m", m)
    # print("updated", Item.objects.values('updated'))
    
    ### vypočte, kolik je aktuálně naskladněno materiálu (items) z uskutečněných na/vyskladnění (storage/removals) a spočítá cenu naskladněného materiálu ###
    id_p = Item.objects.values('id')
    ### prochází jednotlivé items dle "id"
    for item in id_p:
        # print("item:", item)
        ### z naskladnění seskupených dle "id" item vypočte celkový počet naskladněného materiálu
        stor = Storage.objects.filter(item__id=item['id']).values(
            'item').annotate(sum=Sum('quantity_of_material')).values('sum')
        ### z vyskladnění seskupených dle "id" item vypočte celkový počet vyskladněného materiálu
        unstor = Removal.objects.filter(item__id=item['id']).values(
            'item').annotate(sum=Sum('quantity_of_material')).values('sum')
        ### zjistí, zda je u daného "item" uskutečněné naskladnění (storage)
        if len(stor) > 0:
            ### najde item, který je aktuálně součástí daného cyklu "for item in id_p"
            it1 = Item.objects.get(id=item['id'])
            ### uloží počet naskladněného materiálu
            stor1 = stor[0]['sum']
            # print("stor1", stor1)
            ### zjistí, zda je u daného "item" uskutečněné vyskladnění (removal)
            if len(unstor) > 0:
                ### uloží počet vyskladněného materiálu
                unstor1 = unstor[0]['sum']
                # print("unstor1", unstor1)
                ### pokud je vyskladněného materiálu více než naskladněného (tzn. chybně zadáno), uloží 0
                if unstor1 > stor1:
                    it1.quantity_of_material = 0
                    it1.save(update_fields=["quantity_of_material"])
                ### od naskladněného počtu odečte vyskladněný a uloží
                else:
                    it1.quantity_of_material = stor1 - unstor1
                    ### spočítá a uloží aktuální hodnotu naskladněného materiálu
                    it1.value = (stor1 - unstor1) * it1.costs
                    it1.save(update_fields=["quantity_of_material", "value"])
            else:
                ### k danému atributu "quantity_of_material" daného item přiřadí počet naskladněných ks a uloží ho
                it1.quantity_of_material = stor1
                ### spočítá a uloží aktuální hodnotu naskladněného materiálu
                it1.value = stor1 * it1.costs
                it1.save(update_fields=["quantity_of_material", "value"])
                
    
    m_ser = MaterialSerializer(m, many=True)
    
    # return Response(
    #     {
    #         'mt_ser': MaterialTypeSerializer(mt, many=True).data,
    #         'm_ser': MaterialSerializer(m, many=True).data,
    #         'st_ser': StorageSerializer(st, many=True).data,
    #         'r_ser': RemovalSerializer(r, many=True).data
    #     }
    # )
    return Response(m_ser.data)
    
    
@api_view(['GET'])
def item_detail(response, pk):
    m = Item.objects.get(id=pk)
    
    return Response({'m_ser': MaterialSerializer(m, many=False).data})


@api_view(['PUT'])
def item_update(response, pk):
    data = response.data
    print(data)
    item = Item.objects.get(id=pk)
    # m_ser = MaterialSerializer(instance=item,
    #                            data={'name': data['name'],
    #                                  'type': ItemType.objects.get(id=data['type']),
    #                                  'unit': data['unit'],
    #                                  'costs': data['costs'],
    #                                  'supplier': data['supplier'],
    #                                  'link': data['link'],
    #                                  'note': data['note'],
    #                                  }
                            #    data=data
                            # )
    item.name = data['name']
    item.type = ItemType.objects.get(id=data['itemType'])
    item.unit = data['unit']
    item.costs = data['costs']
    item.supplier = data['supplier']
    item.link = data['link']
    item.note = data['note']
    
    item.save()
    
    # print("m_ser: ",m_ser)
    # if m_ser.is_valid():
    #     print("m_ser is valid")
    #     m_ser.save()
    
    m_ser = MaterialSerializer(item)
    
    return Response(m_ser.data)


@api_view(['PUT'])
def itemType_update(response, pk):
    data = response.data
    print(data)
    itemType = ItemType.objects.get(id=pk)

    itemType.name = data['name']
    itemType.note = data['note']
    itemType.save()
    
    m_ser = MaterialTypeSerializer(itemType)
    return Response(m_ser.data)


@csrf_exempt
@api_view(['DELETE'])
def item_delete(response, pk):
    item = Item.objects.get(id=pk)
    item.delete()
    return Response('Položka byla vymazána')


@csrf_exempt
@api_view(['DELETE'])
def itemType_delete(response, pk):
    itemType = ItemType.objects.get(id=pk)
    itemType.delete()
    return Response('Položka byla vymazána')


@csrf_exempt
@api_view(['POST'])
def item_add(request):
    data = request.data
    print(data)
    item = Item.objects.create(
        name = data['name'],
        type=ItemType.objects.get(id=data['itemType']),
        unit=data['unit'],
        # type=ItemType.objects.get(id=data['type']['id']),
        costs=data['costs'],
        supplier=data['supplier'],
        link=data['link'],
        note=data['note']
    )
    i_ser = MaterialSerializer(item, many=False)
    print("i_ser: ",i_ser)
    
    return Response(i_ser.data)


class ItemTypeView(APIView):
    def get(self, request, *args, **kwargs):
        mt = ItemType.objects.all().order_by("name")
        mt_ser = MaterialTypeSerializer(mt, many=True)
        return Response(mt_ser.data)


### STOCK ###

@api_view(['GET'])
def list_storage(response):
    st = Storage.objects.all().order_by("-day_of_storage")

    st_ser = StorageSerializer(st, many=True)

    return Response(st_ser.data)


# class StorageView(APIView):
#     def get(self, request, *args, **kwargs):
#         mt = Storage.objects.all()
#         st_ser = StorageSerializer(mt, many=True)
#         return Response(st_ser.data)


@api_view(['GET'])
def list_removal(response):
    r = Removal.objects.all().order_by("-day_of_removal")

    r_ser = RemovalSerializer(r, many=True)

    return Response(r_ser.data)


@csrf_exempt
@api_view(['POST'])
def storage_add(request):
    data = request.data
    ### vyhledá odpovídající položku naskladnění (dle id)
    selected_item = Item.objects.get(id=data["item"])
    ### spočítá celkovou cenu naskladnění
    storage_costs = int(selected_item.costs) * int(data['quantity_of_material'])
    print("storage_costs:", storage_costs)
    storage = Storage.objects.create(
        day_of_storage=data['day_of_storage'],
        item=Item.objects.get(id=data['item']),
        quantity_of_material=data['quantity_of_material'],
        price=storage_costs,
        # type=ItemType.objects.get(id=data['type']['id']),
        note=data['note'],
        

    )
    s_ser = StorageSerializer(storage, many=False)
    print(s_ser.data)

    return Response(s_ser.data)


@csrf_exempt
@api_view(['POST'])
def removal_add(request):
    data = request.data
    print(data)
    print("data['quantity_of_material']:", data['quantity_of_material'])
    item = Item.objects.get(id=data['item'])
    ### zjistí, kolik je aktuálně naskladněno příslušného materiálu
    item_store = item.quantity_of_material
    print("item_store", item_store)
    ### zjistí, zda není zadán požadavek an vyskladnění většího množství materiálu než je naskladněné množství
    if item_store < int(data['quantity_of_material']):
        #raise ValueError("Neplatné množství vyskladňovaného zboží")
        return HttpResponseBadRequest("Neplatné množství vyskladňovaného zboží")
    else:
        removal = Removal.objects.create(
            day_of_removal=data['day_of_removal'],
            item=item,
            quantity_of_material=data['quantity_of_material'],
            # type=ItemType.objects.get(id=data['type']['id']),
            note=data['note'],
        )
    r_ser = RemovalSerializer(removal, many=False)

    return Response(r_ser.data)


@csrf_exempt
@api_view(['DELETE'])
def storage_delete(response, pk):
    storage = Storage.objects.get(id=pk)
    storage.delete()

    return Response('Položka byla vymazána')


@csrf_exempt
@api_view(['DELETE'])
def removal_delete(response, pk):
    removal = Removal.objects.get(id=pk)
    removal.delete()

    return Response('Položka byla vymazána')



### PRODUCTS ###

@api_view(['POST'])
def productType_add(request):
    data = request.data
    print(data)
    product = ProductType.objects.create(
        name=data['name'],
    )
    p_ser = ProductTypeSerializer(product, many=False)

    return Response(p_ser.data)


@api_view(['GET'])
def list_productType(response):
    pt = ProductType.objects.all().order_by("name")
    pt_ser = ProductTypeSerializer(pt, many=True)
    return Response(pt_ser.data)


# @api_view(['PUT'])
# def product_update(response, pk):
#     data = response.data
#     print(data)
#     product = Product.objects.get(id=pk)

#     product.name = data['name']
#     product.product_type = ProductType.objects.get(id=data['product_type'])
#     #product.items = Item.objects.get(id=data['type'])
#     product.image = data['image']
#     product.price = data['price']
#     product.made = data['made']
#     product.procedure = data['procedure']
#     product.brand = data['brand']
#     product.note = data['note']

#     product.save()

#     p_ser = ProductSerializer(product)
#     return Response(p_ser.data)

class ProductView(APIView):
    parser_classes = (MultiPartParser, FormParser)
    def post(self, request, *args, **kwargs):
        data = request.data
        if data['brand'] == "true":
            brand = True
        if data['brand'] == "false":
            brand = False
        product = Product.objects.create(
            name=data['name'],
            product_type=ProductType.objects.get(id=data['product_type']),
            image=data['image'],
            price=data['price'],
            made=data['made'],
            procedure=data['procedure'],
            brand=brand,
            note=data['note']
        )
        posts_serializer = ProductSerializer(product, many=False)
        return Response(posts_serializer.data)
    
        # if posts_serializer.is_valid():
        #     posts_serializer.save()
        #     return Response(posts_serializer.data, status=status.HTTP_201_CREATED)
        # else:
        #     print('error', posts_serializer.errors)
        #     return Response(posts_serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    def put(self, request, pk, *args, **kwargs):
        data = request.data
        print("data", data)
        #print("data['brand']", data['brand'])
        if data['brand'] == "true":
            brand = True
        if data['brand'] == "false":
            brand = False
        product = Product.objects.get(id=pk)

        product.name = data['name']
        product.product_type = ProductType.objects.get(id=data['product_type'])
        #product.items = Item.objects.get(id=data['type'])
        # print("   product.image:", product.image)
        # print("   data['image'][6:]:", str(data['image'])[7:])
        
        ### zkontroluje, zda byl změne obrázek oproti původnímu
        ### pokud ne, obrázek ponechá; pokud ano, změní ho
        ### pokud by toto ověření nebylo, vždy se přidá "/media/" a obrázek se nebude zobrazovat korektně
        if str(product.image) != str(data['image'])[7:]:
            product.image = data['image']
        
        product.price = data['price']
        product.made = data['made']
        product.procedure = data['procedure']
        product.brand = brand
        product.note = data['note']

        product.save()
        # posts_serializer = ProductSerializer(product, many=False)
        p_ser = ProductSerializer(product)        
        # print("   posts_serializer.data: ", posts_serializer.data)
        # print("   p_ser.data: ", p_ser.data)
        return Response(p_ser.data)
        # return Response(posts_serializer.data)
    
# @api_view(['POST'])
# def product_add(request):
#     data = request.data
#     print("product_add: ",data)
#     ### přiřadí id "items" obsažených v daném výrobku k příslušnému objektu "item"
#     #items = ([ItemPart.objects.get(id=id) for id in data['items']])
#     product = Product.objects.create(
#         name=data['name'],
#         product_type=ProductType.objects.get(id=data['product_type']),
#         image=data['image'],
#         price=data['price'],
#         made=data['made'],
#         procedure=data['procedure'],
#         brand=data['brand'],
#         note=data['note']
#     )
    
#     ### postupně vkládá všechny item k příslušnému výrobku
#     # for item in items:
#     #     product.items.add(item)
#     p_ser = ProductSerializer(product, many=False)
#     #print("p_ser: ", p_ser)

#     return Response(p_ser.data)


@api_view(['PUT'])
def productType_update(response, pk):
    data = response.data
    print(data)
    productType = ProductType.objects.get(id=pk)

    productType.name = data['name']
    #productType.note = data['note']
    productType.save()

    m_ser = ProductTypeSerializer(productType)
    return Response(m_ser.data)


### vloží "item" vč. jeho kvantifikace k danému produktu
@api_view(['PATCH'])
def product_item_patch(response, pk):
    data = response.data
    print(data)
    print("pk",pk)
    product = Product.objects.get(id=pk)
    ### vloží "item" vč. "quantity" k danému produktu a zároveň ho uloží jako nový objekt modelu "ItemPart"
    product.items.create(
        item=Item.objects.get(id=data['item']),
        quantity=data['quantity']
    )
    p_ser = ProductSerializer(product)
    
    ### další část kódu navýší výrobní náklady u daného produktu o množství právě vkládaného materiálu
    ### vyhledá cenu vkládaného materiálu a vynásobí ji množstvím materiálu v daném produktu
    item_costs = int(Item.objects.get(id=data['item']).costs) * float(data['quantity'])
    ### přičte náklady za vkládaný materiál k celkovým výrobním nákladům daného produktu
    product.costs = product.costs + item_costs
    ### aktualizuje pouze pole "costs" u daného produktu
    product.save(update_fields=["costs"])
    
    return Response(p_ser.data)


### upraví vyrobené množství daného produktu
@api_view(['PATCH'])
def product_made_patch(response, pk):
    data = response.data
    print(data)
    product = Product.objects.get(id=pk)
    
    ### přičte/odečte množství vyrobeného produktu
    if data['variant'] == "+":
        product.made += int(data['made'])
        product.stocked += int(data['made'])
    if data['variant'] == "-":
        if product.made - product.sold < int(data['made']):
            return HttpResponseBadRequest("Snížení množství produktů není možné. Vyrobené množstcí by bylo nižší než prodané. Upravte množství prodaných výrobků.")
        
        product.made -= int(data['made'])
        product.stocked -= int(data['made'])
    
    ### aktualizuje pole "costs" a "stocked" u daného produktu
    product.save(update_fields=["made", "stocked"])
    
    p_ser = ProductSerializer(product)
    return Response(p_ser.data)


### upraví obrázek daného produktu
@api_view(['PATCH'])
def product_image_patch(response, pk):
    parser_classes = (MultiPartParser, FormParser)
    data = response.data
    print(data)
    product = Product.objects.get(id=pk)
    product.image = data['image']

    ### aktualizuje pole "costs" a "stocked" u daného produktu
    product.save(update_fields=["image"])

    p_ser = ProductSerializer(product)
    return Response(p_ser.data)

@api_view(['DELETE'])
def product_item_delete(response, pk):
    print("id",pk)
    itemPart = ItemPart.objects.get(id=pk)
    ### vyhledá produkt, u kterého mažu daný materiál
    product = Product.objects.get(id=response.data['data'])
    ### vyhledá cenu odebíraného materiálu a vynásobí ji množstvím materiálu v daném produktu
    item_costs = int(itemPart.item.costs) * float(itemPart.quantity)
    ### odečte náklady za odebíraný materiál od celkových výrobních nákladů daného produktu
    # print("int(itemPart.item.costs)", int(itemPart.item.costs))
    # print("int(itemPart.quantity)", int(itemPart.quantity))
    # print("item_costs", item_costs)
    product.costs = product.costs - item_costs
    # print("product.costs", product.costs)
    ### aktualizuje pouze pole "costs" u daného produktu
    product.save(update_fields=["costs"])
    ### vymaže daný materiál v databázi, aby se již dále nezobrazoval u daného produktu
    itemPart.delete()
    return Response('Položka byla vymazána')

@api_view(['GET'])
def list_product(response):

    
    ### vypočte, kolik bylo prodáno ks jednotlivých výrobků (z uskutečněných transakcí) a kolik jich je aktuálně skladem ###
    id_p = Product.objects.values('id')
    ### prochází jednotlivé výrobky dle "id"
    for product in id_p:
        # print("id_p:", id_p)
        # print("product['id']:", product['id'])
        ### najde produkt, který je aktuálně součástí daného cyklu "for product in id_p"
        pr1 = Product.objects.get(id=product['id'])
        ### do pole "made" daného produktu uloží vyrobené množství
        pr1.stocked = pr1.made
        ### z trasakcí seskupených dle "id" prodaného výrobku vypočte celkový počet prodaných ks daného výrobku
        y = Transaction.objects.filter(product__id=product['id']).values(
            'product').annotate(sum=Sum('quantity_of_product')).values('sum')
        ### iterace "if" pokračuje, pokud je k danému produktu přiřazena transakce
        if len(y) > 0:
            for z in y:            
                ### k danému atributu "sold" daného produktu přiřadí počet prodaných ks a uloží ho
                pr1.sold = z['sum']
                ### od vyrobeného množství daného výrobku odečte prodané množství =>výsledkem je množství skladem
                pr1.stocked = pr1.made - z['sum']
                pr1.save(update_fields=["sold", "stocked"])
        ### větev "else" je pro případ, kdy k danému produktu není přiřazena žádná transakce
        else:
            pr1.sold = 0
            pr1.save(update_fields=["sold", "stocked"])
    
    p = Product.objects.all().order_by("name")
    p_ser = ProductSerializer(p, many=True)
            
    return Response(p_ser.data)


@api_view(['GET'])
def product_detail(response, pk):
    p = Product.objects.get(id=pk)
    return Response({'p_ser': ProductSerializer(p, many=False).data})



@csrf_exempt
@api_view(['DELETE'])
def product_delete(response, pk):
    product = Product.objects.get(id=pk)
    product.delete()

    return Response('Položka byla vymazána')


@csrf_exempt
@api_view(['DELETE'])
def productType_delete(response, pk):
    productType = ProductType.objects.get(id=pk)
    productType.delete()
    return Response('Položka byla vymazána')


@api_view(['POST'])
def saleType_add(request):
    data = request.data
    print(data)
    sale = SaleType.objects.create(
        name=data['name'],
    )
    s_ser = SaleTypeSerializer(sale, many=False)

    return Response(s_ser.data)


@api_view(['GET'])
def list_saleType(response):
    st = SaleType.objects.all().order_by("name")
    st_ser = SaleTypeSerializer(st, many=True)
    return Response(st_ser.data)


@api_view(['POST'])
def sale_add(request):
    data = request.data
    print("sale_add: ",data)
    sale = Sale.objects.create(
        name=data['name'],
        type=SaleType.objects.get(id=data['type']),
        #type=data['type'],
        brand=data['brand'],
        route=data['route'],
        street_number=data['street_number'],
        city=data['city'],
        country=data['country'],
        postal_code=data['postal_code'],
        ic_number=data['ic_number'],
        link=data['link'],
        note=data['note'],
    )
    s_ser = SaleSerializer(sale, many=False)

    return Response(s_ser.data)


@api_view(['GET'])
def list_sale(response):
    s = Sale.objects.all().order_by("name")
    sales_id = Sale.objects.values('id')
    for sale in sales_id:
        ### z naskladnění seskupených dle "id" item vypočte celkový počet naskladněného materiálu
        sales = Transaction.objects.filter(sales_channel_id=sale['id']).values(
            'sales_channel').annotate(sum=Sum('sum_sales')).values('sum')
        ### zjistí, zda je u daného "item" uskutečněné vyskladnění (removal)
        if len(sales) > 0:
            ### najde item, který je aktuálně součástí daného cyklu "for item in id_p"
            sale_current = Sale.objects.get(id=sale['id'])
            sales_curent = sales[0]['sum']
            ### uloží počet vyskladněného materiálu
            sale_current.amount = sales_curent
            sale_current.save(update_fields=["amount"])
    
    s_ser = SaleSerializer(s, many=True)
    return Response(s_ser.data)


@api_view(['GET'])
def sale_detail(response, pk):
    s = Sale.objects.get(id=pk)
    return Response({'s_ser': SaleSerializer(s, many=False).data})


@api_view(['PUT'])
def sale_update(response, pk):
    data = response.data
    print(data)
    sale = Sale.objects.get(id=pk)
    sale.name = data['name']
    sale.type = SaleType.objects.get(id=data['type'])
    sale.brand = data['brand']
    sale.route = data['route']
    sale.street_number = data['street_number']
    sale.city = data['city']
    sale.country = data['country']
    sale.postal_code = data['postal_code']
    sale.ic_number = data['ic_number']
    sale.link = data['link']
    sale.note = data['note']

    sale.save()

    s_ser = SaleSerializer(sale)
    return Response(s_ser.data)


@api_view(['PUT'])
def saleType_update(response, pk):
    data = response.data
    print(data)
    saleType = SaleType.objects.get(id=pk)

    saleType.name = data['name']
    saleType.save()

    m_ser = SaleTypeSerializer(saleType)
    return Response(m_ser.data)


@csrf_exempt
@api_view(['DELETE'])
def sale_delete(response, pk):
    sale = Sale.objects.get(id=pk)
    sale.delete()
    return Response('Položka byla vymazána')


@csrf_exempt
@api_view(['DELETE'])
def saleType_delete(response, pk):
    saleType = SaleType.objects.get(id=pk)
    saleType.delete()
    return Response('Položka byla vymazána')



@api_view(['POST'])
def transaction_add(request):
    data = request.data
    print("transaction_add:",data)
    product = Product.objects.get(id=data['product'])
    standard_price = product.price
    
    if product.stocked < int(data['quantity_of_product']):
        return HttpResponseBadRequest("Nedostatek naskladněného produktu pro provedení transakce")
    
    if data['difference_price'] == "":
        difference_price = 0
    else:
        difference_price = float(data['difference_price'])
    
    if data['price_variant'] == "%":
        difference_price = float(difference_price) * 0.01 * standard_price   
    
    if data['discount_increase'] == "-":
        real_price = standard_price - difference_price
    elif data['discount_increase'] == "+":
        real_price = standard_price + difference_price
    else:
        real_price = standard_price
    
    sum = int(data['quantity_of_product']) * real_price
    
    transaction = Transaction.objects.create(
        day_of_sale=data['day_of_sale'],
        sales_channel=Sale.objects.get(id=data['sales_channel']),
        product=product,
        discount_increase=data['discount_increase'],
        standard_price=standard_price,
        real_price=real_price,
        quantity_of_product=data['quantity_of_product'],
        brand=data['brand'],
        sum_sales=int(sum),
        note=data['note'],
    )
    t_ser = TransactionSerializer(transaction, many=False)
    print("t_ser: ", t_ser)

    return Response(t_ser.data)


@api_view(['GET', 'POST'])
def list_transaction(response):
    data = response.data
    print(data)
    ### ověřuje, zda se kjedná o požadavek na zobrazení všech ("GET") či filtrovaných ("POST") dat 
    if response.method == "GET":
        t = Transaction.objects.all().order_by("-day_of_sale")
    elif response.method == "POST":
        ### fce "date_checker" zkontroluje, zda byl vyplněn datum a pokud nikoliv, vloží defaultní hodnotu
        dates = date_checker(data['day_from'], data['day_to'])
        ### v dates je uložen výsledný list [day_from, day_to]

        ### vyfiltruje a uloží transakce dle datumů a následně je seřadí sestupně ("-") dle datumů ("order_by")
        t = Transaction.objects.filter(
            day_of_sale__lte=dates[1], day_of_sale__gte=dates[0]).order_by(
                "-day_of_sale")
    # print("day_from", day_from)
    # print("day_to", day_to)
    t_ser = TransactionSerializer(t, many=True)
    return Response(t_ser.data)

@api_view(['GET'])
def transaction_detail(response, pk):
    t = Transaction.objects.get(id=pk)
    return Response({'t_ser': TransactionSerializer(t, many=False).data})


@api_view(['PUT'])
def transaction_update(response, pk):
    data = response.data
    print(data)
    transaction = Transaction.objects.get(id=pk)
    
    product = Product.objects.get(id=data['product'])
    standard_price = product.price
    
    print("transaction.quantity_of_product", transaction.quantity_of_product)
    stocked_before = int(transaction.quantity_of_product) + \
        int(product.stocked)
    if stocked_before < int(data['quantity_of_product']):
        return HttpResponseBadRequest("Nedostatek naskladněného produktu pro provedení transakce")

    if data['difference_price'] == "":
        difference_price = 0
    else:
        difference_price = float(data['difference_price'])
        
    if data['price_variant'] == "%":
        difference_price = float(
            difference_price) * 0.01 * standard_price

    if data['discount_increase'] == "-":
        real_price = standard_price - difference_price
    elif data['discount_increase'] == "+":
        real_price = standard_price + difference_price
    else:
        real_price = standard_price

    sum = int(data['quantity_of_product']) * real_price

    transaction.day_of_sale = data['day_of_sale']
    transaction.sales_channel = Sale.objects.get(id=data['sales_channel'])
    transaction.product = product
    transaction.discount_increase = data['discount_increase']
    transaction.standard_price = standard_price
    transaction.real_price = real_price
    transaction.quantity_of_product = data['quantity_of_product']
    transaction.brand = data['brand']
    transaction.sum_sales = int(sum)
    transaction.note = data['note']

    transaction.save()

    t_ser = TransactionSerializer(transaction)
    return Response(t_ser.data)


@csrf_exempt
@api_view(['DELETE'])
def transaction_delete(response, pk):
    transaction = Transaction.objects.get(id=pk)
    transaction.delete()
    return Response('Položka byla vymazána')
