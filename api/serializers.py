from dataclasses import fields
from pyexpat import model
from rest_framework.serializers import ModelSerializer

from . models import ItemType, Item, Storage, Removal


class MaterialTypeSerializer(ModelSerializer):
    class Meta:
        model = ItemType
        fields = '__all__'


class MaterialSerializer(ModelSerializer):
    type = MaterialTypeSerializer(many=False, read_only=True)

    class Meta:
        model = Item
        fields = '__all__'


class StorageSerializer(ModelSerializer):
    item = MaterialSerializer(many=False, read_only=True)
    class Meta:
        model = Storage
        fields = '__all__'


class RemovalSerializer(ModelSerializer):
    item = MaterialSerializer(many=False, read_only=True)
    class Meta:
        model = Removal
        fields = '__all__'
