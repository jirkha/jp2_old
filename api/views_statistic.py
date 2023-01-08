from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework.views import APIView
from django.db.models import Sum
import datetime

from api.models import Transaction
from api.serializers import DailySalesSerializer, MonthlySalesSerializer, YearlySalesSerializer

from .utils import (
    sales_counter,
    date_checker
)


class DailySalesView(APIView):

    def get(self, request):
        ### další část kód slouží k výpočtu tržeb po jednotlivých dnech ###
        # uloží unikátní dny, ve kterých se uskutečnila transakce (class Transaction)
        q = Transaction.objects.values('day_of_sale').distinct().order_by(
            "-day_of_sale")
        ### funkce sales_counter umístěná v utils.py vytvoří list se seznamen dnů s uskutečněnou transakcí a celkovou utrženou částkou
        lst = sales_counter(q)
        # print("lst", lst)
        # if response.method == "POST":
        #     lst = filter(
        #         lambda date: date["day"] <= response.data['day_to'], lst)
        #     lst = filter(
        #         lambda date: date["day"] >= response.data['day_from'], lst)
        #     print("filtered", list(lst))

        results = DailySalesSerializer(lst, many=True).data
        return Response(results)
    
    def post(self, request):
        ### fce "date_checker" zkontroluje, zda byl vyplněn datum a pokud nikoliv, vloží defaultní hodnotu
        dates = date_checker(request.data['day_from'], request.data['day_to'])
        ### v dates je uložen výsledný list [day_from, day_to]

        ### uloží všechny dny, ve kterých se uskutečnila transakce a vyfiltruje je na základě API dat
        q = Transaction.objects.values('day_of_sale').distinct().filter(
            day_of_sale__lte=dates[1], day_of_sale__gte=dates[0]).order_by(
                "-day_of_sale")
        ### funkce sales_counter umístěná v utils.py vytvoří list se seznamen vyfiltrovaných dnů s uskutečněnou transakcí a celkovou utrženou částkou
        lst = sales_counter(q)
        print(lst)
        results = DailySalesSerializer(lst, many=True).data
        return Response(results)


class MonthlySalesView(APIView):

    def get(self, request):
        ### uloží všechny měsíce, ve kterých se uskutečnila transakce a přiřadí k nim tržby
        qm = Transaction.objects.values(
            'day_of_sale__year', 'day_of_sale__month').annotate(amount=Sum('sum_sales'))
        #print("qm", qm)
        ### uloží roky, ve kterých se uskutečnila nějaká transakce
        qy = Transaction.objects.values(
            'day_of_sale__year').distinct().order_by('-day_of_sale__year')
        qy = list(qy)
        #print("qy", qy)
        
        years = [year['day_of_sale__year'] for year in qy]
        lst_y = []
        ### prochází jednotlivé roky
        for year in years:
            dict_y = {}
            ### uloží všechny měsíce v roce, který je součástí aktuální iterace "year"
            lst_m = [d for d in qm if d['day_of_sale__year'] == year]
            #print("lst_m", lst_m)
            dict_y = {"year": year, "months": []}
            ### vytvoří 12 měsíců, ke kterým se následně přiřazují tržby
            for month in range(1, 13):
                sales_m = [
                    d for d in lst_m if d['day_of_sale__month'] == month]
                # print("sales_m",sales_m)
                ### zjistí, zda byla v daném měsíci uskutečněna transakce
                if len(sales_m) > 0:
                    sales_m = sales_m[0]["amount"]
                else:
                    sales_m = 0
                ### vytvoří dict se složeninou měsíce a roku a tržbami
                dict_m = {"month": str(month)+"/"+str(year), "tržby": sales_m}
                dict_y["months"].append(dict_m)
                # print("dict_y", dict_y)
            lst_y.append(dict_y)
        print("lst_y", lst_y)
        results = MonthlySalesSerializer(lst_y, many=True).data
        return Response(results)

    def post(self, request):
        ### uloží všechny měsíce, ve kterých se uskutečnila transakce a přiřadí k nim tržby
        year = request.data['day_of_sale__year']
        qm = list(Transaction.objects.values(
            'day_of_sale__year', 'day_of_sale__month').filter(
                day_of_sale__year=request.data['day_of_sale__year'])
            .annotate(amount=Sum('sum_sales')))
        #print("qm", qm)

        ### uloží všechny měsíce v roce, který je součástí aktuální iterace "year"
        lst_m = [d for d in qm if d['day_of_sale__year'] == year]
        # print("lst_m", lst_m)
        dict_y = {"year": year, "months": []}
        ### vytvoří 12 měsíců, ke kterým se následně přiřazují tržby
        for month in range(1, 13):
            sales_m = [
                d for d in lst_m if d['day_of_sale__month'] == month]
            # print("sales_m",sales_m)
            ### zjistí, zda byla v daném měsíci uskutečněna transakce
            if len(sales_m) > 0:
                sales_m = sales_m[0]["amount"]
            else:
                sales_m = 0
            ### vytvoří dict se složeninou měsíce a roku a tržbami
            dict_m = {"month": str(month)+"/"+str(year), "tržby": sales_m}
            dict_y["months"].append(dict_m)
            # print("dict_y", dict_y)
        lst_y = [dict_y]
        print("lst_y", lst_y)
        results = MonthlySalesSerializer(lst_y, many=True).data
        return Response(results)

class YearlySalesView(APIView):

    def get(self, request):
        ### uloží všechny roky, ve kterých se uskutečnila transakce a přiřadí k nim tržby
        qy = Transaction.objects.values(
            'day_of_sale__year').annotate(amount=Sum('sum_sales')).order_by('-day_of_sale__year')
        id = 0
        ### ověří, zda existuje nějaká uskutečněná transakce
        if len(qy) > 0:            
            ### prochází jednotlivé roky a přiřadí k nim položku "id" pro účely React Selectu
            for item in qy:
                #print("item",item)
                item["id"] = id
                id+=1
                ### přejmenuje položky "day_of_sale__year" na "name" pro [účely React Select]
                item['name'] = item.pop('day_of_sale__year')
        print("qy", qy)
        results = YearlySalesSerializer(list(qy), many=True).data
        return Response(results)
    
