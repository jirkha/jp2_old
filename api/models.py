from django.db import models

###   SKLAD   ###


class ItemType(models.Model):  # typ materiálu
    # název typu suroviny (vůně, sklenice, vosk atd.)
    name = models.CharField(max_length=256)
    note = models.TextField(blank=True, default="")  # popis
    updated = models.DateTimeField(auto_now=True)
    created = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        # return f"NÁZEV PRODUKTU: {self.name}, DRUH ZBOŽÍ: {self.type}"
        return f"{self.name}"


class Item(models.Model):  # položka (součást) produktu
    
    name = models.CharField(max_length=256, blank=False)  # název položky
    ### typ suroviny (položky) 
    type = models.ForeignKey(
        ItemType, related_name="types", on_delete=models.RESTRICT)
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
    ### celková hodnota skladové zásoby daného materiálu, spočítá se automaticky
    value = models.PositiveIntegerField(default=0)
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

    
    
class ItemPart(models.Model):
    item = models.ForeignKey(Item, related_name="item_parts", on_delete=models.CASCADE)
    quantity = models.DecimalField(max_digits=7, decimal_places=2, default=1.00)
    created = models.DateTimeField(auto_now_add=True)
    
    def __str__(self):
        return f"{self.item.name} ({self.quantity})"
    
    
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
    


### PRODUKTY ###

class ProductType(models.Model):  # typ produktu
    # název typu produktu (svíčka, vonný vosk, fifuzér apod.)
    name = models.CharField(max_length=256)
    # automaticky doplní čas přidání typu produktu
    updated = models.DateTimeField(auto_now=True)
    created = models.DateTimeField(auto_now_add=True)
    
    class Meta:
        ordering = ["name"]

    def __str__(self):
        return f"{self.name}"


def upload_to(instance, filename):
    return 'images/{filename}'.format(filename=filename)

class Product(models.Model):  # prudukt (výrobek k prodeji)
    name = models.CharField(max_length=256)  # název produktu
    # typ produktu (svíčka / vonný vosk / difuzér atd.)
    product_type = models.ForeignKey(
        ProductType, related_name="product_types", on_delete=models.RESTRICT)  # volba tyupu produktu
    # součásti daného produktu
    items = models.ManyToManyField(
        ItemPart, related_name="product_items", blank=True)
    # fotografie produktu
    image = models.ImageField(
        upload_to="post_images", 
        null=True, blank=True, default=None)
    # výrobní náklady, které se spočítají automaticky na základě položek "items"
    costs = models.PositiveIntegerField(default=0)
    # prodejní cena
    price = models.PositiveIntegerField(default=0)
    # vyrobené množství
    made = models.PositiveIntegerField(default=0)
    # množství skladem (počítá se automaticky)
    stocked = models.IntegerField(default=0)
    # prodané množství (nezadává se při tvorbě produktu, ale automaticky při transakci)
    sold = models.IntegerField(default=0)
    ### uvádí postup/technologii výroby (např. recept)
    procedure = models.TextField(blank=True)
    # uvádí (a/n), zda se jedná o výrobek pod značkou J&P CANDLES nebo pod jinou značkou (externí spolupráce)
    brand = models.BooleanField(default=True)
    note = models.TextField(blank=True)  # poznámka
    # automaticky doplní čas přidání produktu
    updated = models.DateTimeField(auto_now=True)
    created = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ["created"]

    def __str__(self):
        return f"{self.name} ({self.price} Kč)"


class SaleType(models.Model):  # typ prodejního kanálu
    # název typu prodejního kanálu (# trh / eshop / komisní prodej / kamenný obchod / externí spolupráce apod.)
    name = models.CharField(max_length=256)
    # automaticky doplní čas přidání typu kanálu
    updated = models.DateTimeField(auto_now=True)
    created = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.name}"


class Sale(models.Model):  # typ prodejního kanálu
    # např. název konkrétního trhu, název obchodu kde byla svíčka prodána, eshop atd.
    name = models.CharField(max_length=256)
    type = models.ForeignKey(
        SaleType, related_name="sale_types", on_delete=models.RESTRICT)  # volba typu prodejního kanálu
    # počítá se automaticky z celkové utržené částky v rámci daného prodejního kanálu
    amount = models.IntegerField(default=0, blank=True)
    # další položky slouží pro účely sestavení faktury
    route = models.CharField(max_length=256, blank=True, default="")
    street_number = models.CharField(max_length=256, blank=True, default="")
    city = models.CharField(max_length=256, blank=True, default="")
    country = models.CharField(max_length=256, blank=True, default="")
    postal_code = models.CharField(max_length=256, blank=True)
    ic_number = models.CharField(max_length=256, blank=True)
    link = models.CharField(max_length=256, null=True, default="")
    # uvádí (a/n), zda se jedná o prodejní kanál pod značkou JPcandles nebo pro výrobu pod jinou značkou (externí spolupráce)
    brand = models.BooleanField(default=True)
    note = models.TextField(blank=True)  # poznámka
    updated = models.DateTimeField(auto_now=True)
    created = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.name}"


class Transaction(models.Model):  # transakce
    day_of_sale = models.DateField()  # datum transakce
    # prodejní kanál
    sales_channel = models.ForeignKey(
        Sale, related_name="sales", on_delete=models.CASCADE)
    product = models.ForeignKey(
        Product, related_name="products", on_delete=models.CASCADE)  # prodaný produkt
    # uvádí případný příznak změny ceny oproti přednastavené u daného výrobku (sleva/navýšení)
    discount_increase = models.CharField(max_length=56, default="")
    # prodejní cena za 1 ks / produkt (vloží vždy aktuální cenu nastavenou u atributu "price" v modelu Product)
    standard_price = models.PositiveIntegerField(default=0)
    # spočítá cenu za 1 ks prodaného produktu po ode/přičtení slevy/navýšení
    real_price = models.PositiveIntegerField(default=0)
    quantity_of_product = models.PositiveIntegerField()  # množství prodaného produktu
    # automaticky spočítá celkovou cenu transakce
    sum_sales = models.IntegerField(blank=True)
    # uvádí (a/n), zda se jedná o transakci pod značkou JPcandles
    brand = models.BooleanField(default=True)
    note = models.TextField(blank=True)  # poznámka
    # automaticky doplní čas přidání transakce
    updated = models.DateTimeField(auto_now=True)
    created = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ["day_of_sale"]

    def __str__(self):
        return f"{self.quantity_of_product}x {self.product} ({self.day_of_sale})"

    ### automaticky počítá celkovou utrženou částku dané transakce
    # def save(self, *args, **kwargs):
    #     self.total_price = self.product_price * self.quantity_of_product
    #     return super().save(*args, **kwargs)
