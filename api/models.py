from django.db import models

###   SKLAD   ###


class ItemType(models.Model):  # typ materiálu
    # název typu suroviny (vůně, sklenice, vosk atd.)
    name = models.CharField(max_length=256)
    created = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        # return f"NÁZEV PRODUKTU: {self.name}, DRUH ZBOŽÍ: {self.type}"
        return f"{self.name}"


class Item(models.Model):  # položka (součást) produktu
    
    name = models.CharField(max_length=256, blank=False)  # název položky
    ### typ suroviny (položky) 
    type = models.ForeignKey(
        ItemType, related_name="types", on_delete=models.CASCADE)
    ### měrná jednotka (výběr z možností)
    unit = models.CharField(
        max_length=256,
        #choices=unities,
        default='ks'
    )
    ### cena za danou součást produktu (cena za 1 ks / 1 jednotku jako např. kg)
    costs = models.PositiveIntegerField()
    ### celkové množství materiálu (nezadává se - počítá se automaticky dle na/vy-skladnění!)
    quantity_of_material = models.IntegerField(
        default=0, blank=True)
    ### dodavatel dané součásti produktu (firma od které kupuji danou součást)
    supplier = models.CharField(max_length=256, blank=True)
    ### odkaz na web výrobce/dodavatele dané součásti produktu
    link = models.CharField(max_length=256, null=True)
    note = models.TextField(blank=True)  # poznámka
    updated = models.DateTimeField(auto_now=True)
    created = models.DateTimeField(auto_now_add=True)
    
    def __str__(self):
        # return f"NÁZEV PRODUKTU: {self.name}, DRUH ZBOŽÍ: {self.type}"
        return f"{self.name} ({self.type})"
    
    
# class Material(models.Model):  # skladový materiál
#     # název suroviny (vosk sójový XYZ apod.)
#     name = models.CharField(max_length=256)
#     type = models.ForeignKey(
#         ItemType, related_name="types", on_delete=models.CASCADE)
#     updated = models.DateTimeField(auto_now=True)
#     created = models.DateTimeField(auto_now_add=True)
#     quantity_of_material = models.IntegerField(
#         default=0, blank=True)  # množství materiálu
#     price = models.IntegerField(default=0, blank=True)  # nákupní cena

#     def __str__(self):
#         # return f"NÁZEV PRODUKTU: {self.name}, DRUH ZBOŽÍ: {self.type}"
#         return f"{self.name} ({self.type})"


class Storage(models.Model):  # naskladnění materiálu do skladu
    day_of_storage = models.DateField()  # datum naskladnění
    # item_type = models.ForeignKey(
    #     ItemType, related_name="item_types_s", on_delete=models.CASCADE, default=None)  # typ přidaného materiálu
    item = models.ForeignKey(
        Item, related_name="items_s", on_delete=models.CASCADE, default=None)  # přidaný materiál
    quantity_of_material = models.PositiveIntegerField()  # množství přidaného materiálu
    # celková nákupní cena (počítá se automaticky)
    price = models.IntegerField(blank=True, default=0)
    note = models.TextField(blank=True, default=None)  # poznámka
    # automaticky doplní čas přidání/editace transakce
    updated = models.DateTimeField(auto_now=True)
    created = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.day_of_storage} - storage of {self.item}"
    
    ### automaticky počítá celkovou nákupní cenu daného naskladnění
    # def save(self, *args, **kwargs):
    #     print("item: ", self.item)
    #     item_price0 = self.item
    #     print("item: ", item_price0)
    #     print("2: ",item_price0.filter("count"))
    #     self.price = item_price * self.quantity_of_material
    #     return super().save(*args, **kwargs)


class Removal(models.Model):  # vyskladnění materiálu ze skladu
    day_of_removal = models.DateField()  # datum vyskladnění
    # item_type = models.ForeignKey(
    #     ItemType, related_name="item_types_r", on_delete=models.CASCADE, default=None)  # typ vyskladněného materiálu
    item = models.ForeignKey(
        Item, related_name="items_r", on_delete=models.CASCADE, default=None)  # vyskladněný materiál
    quantity_of_material = models.PositiveIntegerField()  # množství vyskladněného materiálu
    # celková cena vyskladněného materiálu, tzn. o kolik se snižuje celková cena uskladněného materiálu (počítá se automaticky)
    price = models.IntegerField(blank=True, default=0)
    note = models.TextField(blank=True, default=None)  # poznámka
    # automaticky doplní čas přidání/editace transakce
    updated = models.DateTimeField(auto_now=True)
    created = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.material}"
    

