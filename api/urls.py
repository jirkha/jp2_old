from django.urls import path
from . import views
from . views import ItemTypeView

urlpatterns = [
    path('list_items/', views.list_items, name='list_items'),
    path('item_add/', views.item_add, name='item_add'),
    path('item_update/<str:pk>/',
         views.item_update, name='item_update'),
    
    path('item_detail/<str:pk>/', views.item_detail, name='item_detail'), 
    path('item_delete/<str:pk>/', views.item_delete, name='item_delete'),
    path('item_types/',
         ItemTypeView.as_view(), name='item_types'),
]

