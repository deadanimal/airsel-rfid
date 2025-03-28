# Generated by Django 2.2.6 on 2021-01-22 04:10

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('assets', '0027_auto_20210122_0045'),
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
        migrations.AlterField(
            model_name='asset',
            name='asset_attributes',
            field=models.ManyToManyField(blank=True, to='assets.AssetAttribute'),
        ),
        migrations.AlterField(
            model_name='asset',
            name='measurement_types',
            field=models.ManyToManyField(blank=True, to='assets.AssetMeasurementType'),
        ),
    ]
