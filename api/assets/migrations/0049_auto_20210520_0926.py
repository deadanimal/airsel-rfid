# Generated by Django 2.2.6 on 2021-05-20 09:26

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('assets', '0048_auto_20210519_0313'),
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
        #     field=models.CharField(blank=True, max_length=12),
        # ),
        # migrations.AddField(
        #     model_name='assetlocation',
        #     name='postal',
        #     field=models.CharField(blank=True, max_length=100),
        # ),
        migrations.AddField(
            model_name='assetregistration',
            name='bo',
            field=models.CharField(blank=True, default='', max_length=200, null=True),
        ),
        migrations.AddField(
            model_name='assetregistration',
            name='bo_status',
            field=models.CharField(blank=True, default='', max_length=200, null=True),
        ),
        migrations.AddField(
            model_name='assetregistration',
            name='new_parent_location',
            field=models.CharField(blank=True, default='', max_length=200, null=True),
        ),
    ]
