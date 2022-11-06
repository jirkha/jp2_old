from dataclasses import fields
from pyexpat import model
from rest_framework.serializers import ModelSerializer, SerializerMethodField
from rest_framework import serializers

from . models import ItemType, Item, ItemPart, Storage, Removal
from . models import ProductType, Product, SaleType, Sale, Transaction

class MaterialTypeSerializer(ModelSerializer):
    ### pole "material_count" vložené nad rámec polí daných modelem ItemType propojené s fcí "get_material_count" níže
    material_count = SerializerMethodField(read_only=True)
    class Meta:
        model = ItemType
        fields = '__all__'
    
    ### tato funkce spočítá počet položek Items přiřazených k danému ItemType a vloží ho do pole "material_count"
    def get_material_count(self, obj):
        ### "types" je "related_name" Foreign key pole "type" modelu Item
        count = obj.types.count()
        return count


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
    sales_channel = SaleSerializer(many=False, read_only=True)
    product = ProductSerializer(many=False, read_only=True)

    class Meta:
        model = Transaction
        fields = '__all__'


class DailySalesSerializer(serializers.Serializer):
   day = serializers.DateField()
   sales = serializers.IntegerField()
