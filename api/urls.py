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


    path('productType_add/', views.productType_add, name='productType_add'),
    path('product_add/', views.product_add, name='product_add'),
    path('saleType_add/', views.saleType_add, name='saleType_add'),
    path('sale_add/', views.sale_add, name='sale_add'),
    path('transaction_add/', views.transaction_add, name='transaction_add'),
    
    path('list_productType/', views.list_productType, name='list_productType'),
    path('list_product/', views.list_product, name='list_product'),
    path('list_saleType/', views.list_saleType, name='list_saleType'),
    path('list_sale/', views.list_sale, name='list_sale'),
    path('list_transaction/', views.list_transaction, name='list_transaction'),
    
    path('product_detail/<str:pk>/',
         views.product_detail, name='product_detail'),
    path('sale_detail/<str:pk>/',
         views.sale_detail, name='sale_detail'),
    path('transaction_detail/<str:pk>/',
         views.transaction_detail, name='transaction_detail'),
    
    path('product_update/<str:pk>',
         views.product_update, name='product_update'),
    path('product_item_patch/<str:pk>',
         views.product_item_patch, name='product_item_patch'),
    path('sale_update/<str:pk>',
         views.sale_update, name='sale_update'),
    path('transaction_update/<str:pk>',
         views.transaction_update, name='transaction_update'),
    
    path('product_delete/<str:pk>/',
         views.product_delete, name='product_delete'),
    path('product_item_delete/<str:pk>/',
         views.product_item_delete, name='product_item_delete'),
    path('sale_delete/<str:pk>/',
         views.sale_delete, name='sale_delete'),
    path('transaction_delete/<str:pk>/',
         views.transaction_delete, name='transaction_delete'),
]

