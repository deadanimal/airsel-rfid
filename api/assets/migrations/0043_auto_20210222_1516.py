# Generated by Django 2.2.6 on 2021-02-22 15:16

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('assets', '0042_auto_20210220_1423'),
    ]

    operations = [
        migrations.AlterField(
            model_name='assetlocationsync',
            name='description',
            field=models.CharField(blank=True, max_length=255),
        ),
    ]
