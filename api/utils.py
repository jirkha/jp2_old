import datetime
from api.models import Transaction, Product

def sales_counter(q):
    lst = []
    temp1 = 0
    for date in q:  ## prochází postupně všechny dny, kdy se uskutečnila transakce
        ### uloží konkrétní den dané iterace cyklu "for"
        t1 = Transaction.objects.filter(day_of_sale=date["day_of_sale"])
        temp = 0
        for x in range(len(t1)):  # prochází postupně všechny transakce daného dne
            ### uloží utrženou částku za danou transakci
            temp += (t1[x]).sum_sales
        ### We can use (*) operator to get all the values of the dictionary in a list
        ### uloží hodnotu data aktuální iterace (* a fce values slouží k očištění daného data, aby nebylo zabaleno v listu a dalo se dále uložit)
        temp_value = [*(q[temp1]).values()][0]
        # print("temp_value", temp_value)
        ### přidá do dočasného listu datum z temp_value spolu s utrženou částkou v daném dni (fce"extend" je alternativou k "append" a slouží k vložení více hodnot do listu najdednou)
        dict = {"day": temp_value, "tržby": temp}
        lst.append(dict)
        ### vloží hodnoty z dočasného listu "lst" do finálního souhrnného listu "tt", který obsahuje všechny potřebného hodnoty pro výpis tržeb
        ### total += temp  # počítá celkovou utrženou částku za všechny transakce
        temp1 += 1
        dict = {}
    return lst

def date_checker(since, to):
    ### zkontroluje, zda byl vyplněn datum a pokud nikoliv, vloží defaultní hodnotu
    if since == "":
        day_from = datetime.date(2021, 1, 1)
    else:
        day_from = since
    if to == "":
        day_to = datetime.date.today()
    else:
        day_to = to
    return [day_from, day_to]


def product_of_transaction(transaction_list):
    ### do serializeru konkrétního prodejního kanálu přidá pole "pruduct_name", které umožní zobrazit produkt prodaný v rámci dané transakce u prodejního kanálu
    for transaction in transaction_list:
        ### prochází všechny transakce uskutečněné v rámci daného prodejního kanálu
        #print("transaction", transaction)
        product_id = transaction['product_id']
        #print('product_id', product_id)
        product = Product.objects.get(id=product_id).name
        print("product", product)
        ### přidá novou položku "product_name" do seznamu
        transaction['product_name'] = product
        
    return transaction_list
