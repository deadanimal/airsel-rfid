# Generated by Django 2.2.6 on 2021-01-26 09:01

from django.db import migrations, models
import uuid


class Migration(migrations.Migration):

    dependencies = [
        ('inventory', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='InventoryMaterial',
            fields=[
                ('id', models.UUIDField(default=uuid.uuid4, editable=False, primary_key=True, serialize=False)),
                ('movement_request_number', models.IntegerField()),
                ('movement_request_type', models.CharField(default='', max_length=100)),
                ('description', models.CharField(default='', max_length=300)),
                ('required_date', models.DateTimeField()),
                ('transaction_type', models.CharField(default='', max_length=100)),
                ('status', models.CharField(default='', max_length=100)),
                ('source_sub_inventory', models.CharField(default='', max_length=100)),
                ('source_locator', models.DateTimeField(auto_now=True)),
                ('destination_sub_inventory', models.CharField(default='', max_length=100)),
                ('destination_locator', models.CharField(default='', max_length=100)),
                ('destination_account', models.CharField(default='', max_length=100)),
                ('line_number', models.IntegerField()),
                ('item', models.CharField(max_length=100)),
                ('requested_quantity', models.IntegerField()),
                ('uom_name', models.CharField(default='', max_length=100)),
                ('created_by', models.CharField(default='', max_length=100)),
            ],
        ),
        migrations.RenameField(
            model_name='inventoryitemuomintra',
            old_name='attribure1',
            new_name='attribute1',
        ),
    ]
