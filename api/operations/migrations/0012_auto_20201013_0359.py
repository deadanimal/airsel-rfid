# Generated by Django 2.2.6 on 2020-10-13 03:59

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('operations', '0011_auto_20201013_0359'),
    ]

    operations = [
        migrations.AlterField(
            model_name='workrequest',
            name='creation_date_time',
            field=models.DateTimeField(auto_now_add=True),
        ),
    ]
