# Generated by Django 2.2.6 on 2021-05-03 07:55

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('inventory', '0005_auto_20210204_0826'),
    ]

    operations = [
        migrations.DeleteModel(
            name='InventoryItemUomInter',
        ),
        migrations.DeleteModel(
            name='InventoryItemUomIntra',
        ),
    ]
