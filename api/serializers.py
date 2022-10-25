from dataclasses import fields
from pyexpat import model
from rest_framework.serializers import ModelSerializer

from . models import ItemType, Item, ItemPart, Storage, Removal
from . models import ProductType, Product, SaleType, Sale, Transaction

class MaterialTypeSerializer(ModelSerializer):
    class Meta:
        model = ItemType
        fields = '__all__'


class MaterialSerializer(ModelSerializer):
    type = MaterialTypeSerializer(many=False, read_only=True)

    class Meta:
        model = Item
        fields = '__all__'


class ItemPartSerializer(ModelSerializer):
    item = MaterialSerializer(many=False, read_only=True)

    class Meta:
        model = ItemPart
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


class ProductTypeSerializer(ModelSerializer):
    class Meta:
        model = ProductType
        fields = '__all__'


class ProductSerializer(ModelSerializer):
    product_type = ProductTypeSerializer(many=False, read_only=True)
    items = ItemPartSerializer(many=True, read_only=True)

    class Meta:
        model = Product
        fields = '__all__'


class SaleTypeSerializer(ModelSerializer):
    class Meta:
        model = SaleType
        fields = '__all__'


class SaleSerializer(ModelSerializer):
    type = SaleTypeSerializer(many=False, read_only=True)

    class Meta:
        model = Sale
        fields = '__all__'


class TransactionSerializer(ModelSerializer):
    sale = SaleSerializer(many=False, read_only=True)
    product = ProductSerializer(many=False, read_only=True)

    class Meta:
        model = Transaction
        fields = '__all__'
