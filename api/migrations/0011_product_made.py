# Generated by Django 4.1 on 2022-10-29 13:53

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0010_rename_product_price_transaction_standard_price_and_more'),
    ]

    operations = [
        migrations.AddField(
            model_name='product',
            name='made',
            field=models.PositiveIntegerField(default=0),
        ),
    ]
