# Generated by Django 2.2.6 on 2021-05-19 03:13

from django.db import migrations, models
import uuid


class Migration(migrations.Migration):

    dependencies = [
        ('assets', '0047_auto_20210504_0225'),
    ]

    operations = [
        migrations.CreateModel(
            name='AssetAttributePredefine',
            fields=[
                ('id', models.UUIDField(default=uuid.uuid4, editable=False, primary_key=True, serialize=False)),
                ('attribute_field_name', models.CharField(blank=True, max_length=100)),
                ('characteristic_value', models.CharField(blank=True, max_length=100)),
                ('created_date', models.DateTimeField(auto_now_add=True)),
                ('modified_date', models.DateTimeField(auto_now=True)),
            ],
        ),
        migrations.CreateModel(
            name='AssetAttributeReference',
            fields=[
                ('id', models.UUIDField(default=uuid.uuid4, editable=False, primary_key=True, serialize=False)),
                ('char_type_cd', models.CharField(blank=True, max_length=100)),
                ('attribute_field_name', models.CharField(blank=True, max_length=100)),
                ('created_date', models.DateTimeField(auto_now_add=True)),
                ('modified_date', models.DateTimeField(auto_now=True)),
            ],
        ),
        migrations.CreateModel(
            name='AssetMaintenanceSpec',
            fields=[
                ('id', models.UUIDField(default=uuid.uuid4, editable=False, primary_key=True, serialize=False)),
                ('maintenance_spec_cd', models.CharField(blank=True, max_length=100)),
                ('asset_type_cd', models.CharField(blank=True, max_length=100)),
                ('created_date', models.DateTimeField(auto_now_add=True)),
                ('modified_date', models.DateTimeField(auto_now=True)),
            ],
        ),
        migrations.RenameField(
            model_name='assetregistration',
            old_name='asset_plate_number',
            new_name='attached_to_asset_badge_no',
        ),
        migrations.RenameField(
            model_name='assetregistration',
            old_name='internal_asset_identity',
            new_name='attached_to_asset_id',
        ),
        migrations.RenameField(
            model_name='assetregistration',
            old_name='parent_asset_plate_number',
            new_name='specification',
        )
    ]
