from django.contrib import admin

# Register your models here.

from . models import ItemType, Item, Storage, Removal, Product

admin.site.register(ItemType)
admin.site.register(Item)
admin.site.register(Storage)
admin.site.register(Removal)
admin.site.register(Product)
