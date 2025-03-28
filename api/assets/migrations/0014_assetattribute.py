# Generated by Django 2.2.6 on 2021-01-19 08:56

from django.db import migrations, models
import uuid


class Migration(migrations.Migration):

    dependencies = [
        ('assets', '0013_auto_20210119_0840'),
    ]

    operations = [
        migrations.CreateModel(
            name='AssetAttribute',
            fields=[
                ('id', models.UUIDField(default=uuid.uuid4, editable=False, primary_key=True, serialize=False)),
                ('asset_id', models.CharField(default=0, max_length=100)),
                ('characteristic_type', models.CharField(default=0, max_length=100)),
                ('characteristic_value', models.CharField(default=0, max_length=100)),
                ('adhoc_value', models.CharField(default=0, max_length=100)),
                ('created_date', models.DateTimeField(auto_now_add=True)),
                ('modified_date', models.DateTimeField(auto_now=True)),
            ],
        ),
    ]
