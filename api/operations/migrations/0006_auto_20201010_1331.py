# Generated by Django 2.2.6 on 2020-10-10 13:31

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('operations', '0005_auto_20201010_1309'),
    ]

    operations = [
        migrations.AlterField(
            model_name='workactivity',
            name='comments_dt',
            field=models.TextField(blank=True, default='NA'),
        ),
        migrations.AlterField(
            model_name='workactivity',
            name='comments_f',
            field=models.TextField(blank=True, default='NA'),
        ),
    ]
