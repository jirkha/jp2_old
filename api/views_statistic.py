from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework.views import APIView

from api.models import Transaction
from api.serializers import DailySalesSerializer


class DailySalesView(APIView):

    def get(self, request):
        ### další část kód slouží k výpočtu tržeb po jednotlivých dnech ###
        # uloží unikátní dny, ve kterých se uskutečnila transakce (class Transaction)
        q = Transaction.objects.values('day_of_sale').distinct()
        #print(q)
        #global tt
        lst = []
        temp1 = 0
        # total = 0
        for date in q:  # prochází postupně všechny dny, kdy se uskutečnila transakce
                # uloží konkrétní den dané iterace cyklu "for"
                t1 = Transaction.objects.filter(day_of_sale=date["day_of_sale"])
                #print(t1)
                #print(len(t1))
                temp = 0
                for x in range(len(t1)):  # prochází postupně všechny transakce daného dne
                    #print(x)
                    # uloží utrženou částku za danou transakci
                    temp += (t1[x]).sum
                    #print(temp)

                ### We can use (*) operator to get all the values of the dictionary in a list
                # uloží hodnotu data aktuální iterace (* a fce values slouží k očištění daného data, aby nebylo zabaleno v listu a dalo se dále uložit)
                temp_value = [*(q[temp1]).values()][0]
                print("temp_value", temp_value)
                # přidá do dočasného listu datum z temp_value spolu s utrženou částkou v daném dni (fce"extend" je alternativou k "append" a slouží k vložení více hodnot do listu najdednou)
                dict = {"day": temp_value, "sales": temp}
                lst.append(dict)
                # vloží hodnoty z dočasného listu "lst" do finálního souhrnného listu "tt", který obsahuje všechny potřebného hodnoty pro výpis tržeb
                # total += temp  # počítá celkovou utrženou částku za všechny transakce
                temp1 += 1
                dict = {}

            #tt.sort()  # seřadí list podle datumů vzestupně
        print("lst", lst)
        
        results = DailySalesSerializer(lst, many=True).data
        return Response(results)


