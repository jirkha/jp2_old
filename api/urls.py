from django.urls import path
from . import views
from . views import ItemTypeView, ItemView

urlpatterns = [
    path('list_items/', views.list_items, name='list_items'),
    path('itemType_add/', views.itemType_add, name='itemType_add'),
    path('item_add/', views.item_add, name='item_add'),
    path('item_update/<str:pk>/',
         views.item_update, name='item_update'),
    
    path('item_detail/<str:pk>/', views.item_detail, name='item_detail'), 
    path('item_delete/<str:pk>/', views.item_delete, name='item_delete'),
    path('item_types/',
         ItemTypeView.as_view(), name='item_types'),
    path('items/',
         ItemView.as_view(), name='items'),
    
    path('list_storage/', views.list_storage, name='list_storage'),
    path('list_removal/', views.list_removal, name='list_removal'),
    path('storage_add/', views.storage_add, name='storage_add'),
    path('removal_add/', views.removal_add, name='removal_add'),
    path('storage_delete/<str:pk>/', views.storage_delete, name='storage_delete'),
    path('removal_delete/<str:pk>/', views.removal_delete, name='removal_delete'),

#     path('storages/',
#          StorageView.as_view(), name='storages'),
]


