# Generated by Django 4.1 on 2022-10-31 17:15

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0011_product_made'),
    ]

    operations = [
        migrations.AlterField(
            model_name='product',
            name='sold',
            field=models.IntegerField(default=0),
        ),
        migrations.AlterField(
            model_name='product',
            name='stocked',
            field=models.IntegerField(default=0),
        ),
    ]
