# Generated by Django 2.2.6 on 2021-01-25 05:02

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('assets', '0030_auto_20210122_1716'),
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
        migrations.AddField(
            model_name='assetattributecolumn',
            name='brand',
            field=models.BooleanField(default=False),
        ),
        # migrations.AddField(
        #     model_name='assetlocation',
        #     name='postal',
        #     field=models.CharField(blank=True, max_length=100),
        # ),
    ]
