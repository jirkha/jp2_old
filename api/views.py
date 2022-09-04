from urllib import request
from django.shortcuts import render
from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework.views import APIView
from django.views.decorators.csrf import csrf_exempt

from . models import ItemType, Item, Storage, Removal
from . serializers import MaterialTypeSerializer, MaterialSerializer, StorageSerializer, RemovalSerializer

# Create your views here.

@api_view(['GET'])
def list_items(response):
    mt = ItemType.objects.all()
    m = Item.objects.all()
    st = Storage.objects.all()
    r = Removal.objects.all()
    
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
    item = Item.objects.get(id=pk)
    m_ser = MaterialSerializer(instance=item, data=data)

    if m_ser.is_valid():
        m_ser.save()
    
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
        # type=ItemType.objects.get(id=data['type']['id']),
        costs=data['costs'],
        supplier=data['supplier'],
        link=data['link'],
        note=data['note']
    )
    i_ser = MaterialSerializer(item, many=False)
    
    return Response(i_ser.data)


class ItemTypeView(APIView):
    def get(self, request, *args, **kwargs):
        mt = ItemType.objects.all()
        mt_ser = MaterialTypeSerializer(mt, many=True)
        return Response(mt_ser.data)
