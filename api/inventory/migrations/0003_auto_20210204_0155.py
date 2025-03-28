# Generated by Django 2.2.6 on 2021-02-04 01:55

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('inventory', '0002_auto_20210126_0901'),
    ]

    operations = [
        migrations.AddField(
            model_name='inventorygrn',
            name='business_type',
            field=models.CharField(default='', max_length=240),
        ),
        migrations.AlterField(
            model_name='inventorygrn',
            name='header_interface_number',
            field=models.CharField(blank=True, default='0', max_length=100),
        ),
        migrations.AlterField(
            model_name='inventorymaterial',
            name='line_number',
            field=models.IntegerField(blank=True),
        ),
        migrations.AlterField(
            model_name='inventorypurchaseorder',
            name='uom_code',
            field=models.CharField(default='', max_length=25),
        ),
    ]
