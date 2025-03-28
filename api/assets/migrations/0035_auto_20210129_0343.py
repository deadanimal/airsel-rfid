# Generated by Django 2.2.6 on 2021-01-29 03:43

from django.db import migrations, models
import uuid


class Migration(migrations.Migration):

    dependencies = [
        ('assets', '0034_auto_20210128_1157'),
    ]

    operations = [
        # migrations.RemoveField(
        #     model_name='asset',
        #     name='attached_to_assist_id',
        # ),
        # migrations.RemoveField(
        #     model_name='asset',
        #     name='handed_over_assist',
        # ),
        # migrations.AddField(
        #     model_name='asset',
        #     name='attached_to_asset_id',
        #     field=models.CharField(blank=True, max_length=100),
        # ),
        # migrations.AddField(
        #     model_name='asset',
        #     name='handed_over_asset',
        #     field=models.CharField(blank=True, max_length=100),
        # ),
        # migrations.AddField(
        #     model_name='asset',
        #     name='location_id',
        #     field=models.CharField(blank=True, max_length=100),
        # ),
        # migrations.AddField(
        #     model_name='assetlocation',
        #     name='postal',
        #     field=models.CharField(blank=True, max_length=100),
        # ),
        migrations.AlterField(
            model_name='assetlocation',
            name='id',
            field=models.UUIDField(default=uuid.uuid4, primary_key=True, serialize=False),
        ),
    ]
