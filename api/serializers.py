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
    ### pole "product_count" vložené nad rámec polí daných modelem ProductType propojené s fcí "get_product_count" níže
    product_count = SerializerMethodField(read_only=True)
    class Meta:
        model = ProductType
        fields = '__all__'
    
    ### tato funkce spočítá počet položek Product přiřazených k danému ProductType a vloží ho do pole "product_count"
    def get_product_count(self, obj):
        ### "product_types" je "related_name" Foreign key pole "product_type" modelu Product
        count = obj.product_types.count()
        return count


class ProductSerializer(ModelSerializer):
    product_type = ProductTypeSerializer(many=False, read_only=True)
    items = ItemPartSerializer(many=True, read_only=True)

    class Meta:
        model = Product
        fields = '__all__'


class SaleTypeSerializer(ModelSerializer):
    ### pole "sale_count" vložené nad rámec polí daných modelem SaleType propojené s fcí "get_sale_count" níže
    sale_count = SerializerMethodField(read_only=True)
    class Meta:
        model = SaleType
        fields = '__all__'

    ### tato funkce spočítá počet položek Sale přiřazených k danému SaleType a vloží ho do pole "sale_count"
    def get_sale_count(self, obj):
        ### "product_types" je "related_name" Foreign key pole "product_type" modelu Product
        count = obj.sale_types.count()
        return count
    

class SaleSerializer(ModelSerializer):
    ### pole "transaction_count" vložené nad rámec polí daných modelem Sale propojené s fcí "get_transaction_count" níže
    transaction_count = SerializerMethodField(read_only=True)
    type = SaleTypeSerializer(many=False, read_only=True)

    class Meta:
        model = Sale
        fields = '__all__'
    
    ### tato funkce spočítá počet uskutečněných transakcí přiřazených k danému Sale a vloží ho do pole "transaction_count"
    def get_transaction_count(self, obj):
        ### "sales" je "related_name" Foreign key pole "sales_channel" modelu Transaction
        count = obj.sales.count()
        return count


class TransactionSerializer(ModelSerializer):
    sales_channel = SaleSerializer(many=False, read_only=True)
    product = ProductSerializer(many=False, read_only=True)

    class Meta:
        model = Transaction
        fields = '__all__'


class DailySalesSerializer(serializers.Serializer):
   day = serializers.DateField()
   sales = serializers.IntegerField()
