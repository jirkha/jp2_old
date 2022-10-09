from urllib import request
from django.shortcuts import render
from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework.views import APIView
from django.views.decorators.csrf import csrf_exempt
from django.db.models import Sum

from . models import ItemType, Item, Storage, Removal
from . serializers import MaterialTypeSerializer, MaterialSerializer, StorageSerializer, RemovalSerializer

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
    ### spočítá ceůlkovou cenu naskladnění
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
