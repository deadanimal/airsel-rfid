# Generated by Django 2.2 on 2021-08-05 03:05

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('dashboard', '0002_acs_acs2_tar_wa'),
    ]

    operations = [
        migrations.RenameField(
            model_name='acs',
            old_name='backLog',
            new_name='asset_last_month',
        ),
        migrations.RenameField(
            model_name='acs',
            old_name='category',
            new_name='asset_today',
        ),
        migrations.RenameField(
            model_name='acs',
            old_name='inprogress',
            new_name='percentage_asset_condition',
        ),
        migrations.RenameField(
            model_name='acs',
            old_name='new',
            new_name='total_asset_condition_rating',
        ),
    ]
