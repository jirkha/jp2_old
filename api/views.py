from urllib import request
from django.shortcuts import render
from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework.views import APIView
from django.views.decorators.csrf import csrf_exempt
from django.db.models import Sum

from . models import ItemType, Item, ItemPart, Storage, Removal
from . models import ProductType, Product, SaleType, Sale, Transaction

from . serializers import MaterialTypeSerializer, MaterialSerializer, ItemPartSerializer, StorageSerializer, RemovalSerializer
from . serializers import ProductTypeSerializer, ProductSerializer, SaleTypeSerializer, SaleSerializer, TransactionSerializer

### ITEMS ###

@csrf_exempt
@api_view(['POST'])
def itemType_add(request):
    data = request.data
    print(data)
    item = ItemType.objects.create(
        name=data['name'],
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
    m = Item.objects.all()
    # st = Storage.objects.all()
    # r = Removal.objects.all()
    
    # print("m", m)
    # print("updated", Item.objects.values('updated'))
    
    ### vypočte, kolik je aktuálně naskladněno materiálu (items) z uskutečněných na/vyskladnění (storage/removals) ###
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
                    it1.save()
                ### od naskladněného počtu odečte vyskladněný a uloží
                else:
                    it1.quantity_of_material = stor1 - unstor1
                    it1.save()
            else:
                ### k danému atributu "quantity_of_material" daného item přiřadí počet naskladněných ks a uloží ho
                it1.quantity_of_material = stor1
                it1.save()
                
    
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
    item.type = ItemType.objects.get(id=data['type'])
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


@csrf_exempt
@api_view(['DELETE'])
def item_delete(response, pk):
    item = Item.objects.get(id=pk)
    item.delete()

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
        mt = ItemType.objects.all()
        mt_ser = MaterialTypeSerializer(mt, many=True)
        return Response(mt_ser.data)


### STOCK ###

@api_view(['GET'])
def list_storage(response):
    st = Storage.objects.all()

    st_ser = StorageSerializer(st, many=True)

    return Response(st_ser.data)


# class StorageView(APIView):
#     def get(self, request, *args, **kwargs):
#         mt = Storage.objects.all()
#         st_ser = StorageSerializer(mt, many=True)
#         return Response(st_ser.data)


@api_view(['GET'])
def list_removal(response):
    r = Removal.objects.all()

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
        raise ValueError("Neplatné množství vyskladňovaného zboží")
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
    pt = ProductType.objects.all()
    pt_ser = ProductTypeSerializer(pt, many=True)
    return Response(pt_ser.data)


@api_view(['POST'])
def product_add(request):
    data = request.data
    print("product_add: ",data)
    ### přiřadí id "items" obsažených v daném výrobku k příslušnému objektu "item"
    #items = ([ItemPart.objects.get(id=id) for id in data['items']])
    product = Product.objects.create(
        name=data['name'],
        product_type=ProductType.objects.get(id=data['product_type']),
        #costs=data['costs'], SPOČÍTAT FUNKCÍ
        price=data['price'],
        stocked=data['stocked'],
        #sold = SPOČÍTAT FUNKCÍ
        procedure=data['procedure'],
        brand=data['brand'],
        note=data['note']
    )
    ### postupně vkládá všechny item k příslušnému výrobku
    # for item in items:
    #     product.items.add(item)
    p_ser = ProductSerializer(product, many=False)
    print("p_ser: ", p_ser)

    return Response(p_ser.data)

### vloží "item" vč. jeho kvantifikace k danému produktu
@api_view(['PATCH'])
def product_item_patch(response, pk):
    data = response.data
    print(data)
    product = Product.objects.get(id=pk)
    ### vloží "item" vč. "quantity" k danému produktu a zároveň ho uloží jako nový objekt modelu "ItemPart"
    product.items.create(
        item=Item.objects.get(id=data['item']),
        quantity=data['quantity']
    )
    p_ser = ProductSerializer(product)
    
    ### další část kódu navýší výrobní náklady u daného produktu o množství právě vkládaného materiálu
    ### vyhledá cenu vkládaného materiálu a vynásobí ji množstvím materiálu v daném produktu
    item_costs = int(Item.objects.get(id=data['item']).costs) * int(data['quantity'])
    ### přičte náklady za vkládaný materiál k celkovým výrobním nákladům daného produktu
    product.costs = product.costs + item_costs
    ### aktualizuje pouze pole "costs" u daného produktu
    product.save(update_fields=["costs"])
    
    return Response(p_ser.data)


@api_view(['DELETE'])
def product_item_delete(response, pk):
    itemPart = ItemPart.objects.get(id=pk)
    ### vyhledá produkt, u kterého mažu daný materiál
    product = Product.objects.get(id=response.data['data'])
    ### vyhledá cenu odebíraného materiálu a vynásobí ji množstvím materiálu v daném produktu
    item_costs = int(itemPart.item.costs) * int(itemPart.quantity)
    ### odečte náklady za odebíraný materiál od celkových výrobních nákladů daného produktu
    product.costs = product.costs - item_costs
    ### aktualizuje pouze pole "costs" u daného produktu
    product.save(update_fields=["costs"])
    ### vymaže daný materiál v databázi, aby se již dále nezobrazoval u daného produktu
    itemPart.delete()
    return Response('Položka byla vymazána')

@api_view(['GET'])
def list_product(response):
    p = Product.objects.all()
    p_ser = ProductSerializer(p, many=True)
    return Response(p_ser.data)


@api_view(['GET'])
def product_detail(response, pk):
    p = Product.objects.get(id=pk)
    return Response({'p_ser': ProductSerializer(p, many=False).data})


@api_view(['PUT'])
def product_update(response, pk):
    data = response.data
    print(data)
    product = Product.objects.get(id=pk)

    product.name = data['name']
    product.product_type = ProductType.objects.get(id=data['product_type'])
    #product.items = Item.objects.get(id=data['type'])
    product.price = data['price']
    product.stocked = data['stocked']
    product.procedure = data['procedure']
    product.brand = data['brand']
    product.note = data['note']

    product.save()

    p_ser = ProductSerializer(product)
    return Response(p_ser.data)


@csrf_exempt
@api_view(['DELETE'])
def product_delete(response, pk):
    product = Product.objects.get(id=pk)
    product.delete()

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
    st = SaleType.objects.all()
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
        note=data['note'],
    )
    s_ser = SaleSerializer(sale, many=False)
    print("s_ser: ", s_ser)

    return Response(s_ser.data)


@api_view(['GET'])
def list_sale(response):
    s = Sale.objects.all()
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
    sale.note = data['note']

    sale.save()

    s_ser = SaleSerializer(sale)
    return Response(s_ser.data)


@csrf_exempt
@api_view(['DELETE'])
def sale_delete(response, pk):
    sale = Sale.objects.get(id=pk)
    sale.delete()
    return Response('Položka byla vymazána')


@api_view(['POST'])
def transaction_add(request):
    data = request.data
    print("transaction_add:",data)
    transaction = Transaction.objects.create(
        day_of_sale=data['day_of_sale'],
        # product_type=ProductType.objects.get(id=data['productType']),
        sales_channel=data['sales_channel'],
        product=data['product'],
        discount=data['discount'],
        #product_price=data['product_price'], SPOČÍTAT FUNKCÍ
        quantity_of_product=data['quantity_of_product'],
        note=data['note'],
    )
    t_ser = TransactionSerializer(transaction, many=False)
    print("t_ser: ", t_ser)

    return Response(t_ser.data)


@api_view(['GET'])
def list_transaction(response):
    t = Transaction.objects.all()
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

    transaction.day_of_sale = data['day_of_sale']
    transaction.sales_channel = Sale.objects.get(id=data['sales_channel'])
    transaction.product = Product.objects.get(id=data['product'])
    transaction.discount = data['discount']
    transaction.quantity_of_product = data['quantity_of_product']
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