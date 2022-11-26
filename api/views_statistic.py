from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework.views import APIView
from django.db.models import Sum
import datetime

from api.models import Transaction
from api.serializers import DailySalesSerializer

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
        
        qm = Transaction.objects.values(
            'day_of_sale__year', 'day_of_sale__month').annotate(amount=Sum('sum_sales'))
        qy = Transaction.objects.values(
            'day_of_sale__year').annotate(amount=Sum('sum_sales'))
        print("qm", qm)
        print("qy", qy)
        
        lst = sales_counter(q)
        
        print("lst", lst)
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
