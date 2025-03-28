# Generated by Django 2.2.6 on 2021-01-20 04:11

from django.db import migrations, models
import django.utils.timezone


class Migration(migrations.Migration):

    dependencies = [
        ('operations', '0016_auto_20210118_1655'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='operationalreading',
            name='modified_by',
        ),
        migrations.RemoveField(
            model_name='operationalreading',
            name='reading_date_time',
        ),
        migrations.RemoveField(
            model_name='operationalreading',
            name='record_by',
        ),
        migrations.RemoveField(
            model_name='operationalreading',
            name='record_date',
        ),
        migrations.AddField(
            model_name='operationalreading',
            name='created_date',
            field=models.DateTimeField(auto_now_add=True, default=django.utils.timezone.now),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='operationalreading',
            name='initial_value_flag',
            field=models.CharField(blank=True, max_length=100),
        ),
        migrations.AddField(
            model_name='operationalreading',
            name='reading_datetime',
            field=models.DateTimeField(auto_now=True),
        ),
        migrations.AddField(
            model_name='operationalreading',
            name='submitted_datetime',
            field=models.DateTimeField(auto_now=True),
        ),
        migrations.AlterField(
            model_name='operationalreading',
            name='asset_id',
            field=models.CharField(blank=True, max_length=100),
        ),
        migrations.AlterField(
            model_name='operationalreading',
            name='badge_number',
            field=models.CharField(blank=True, max_length=100),
        ),
        migrations.AlterField(
            model_name='operationalreading',
            name='current_value',
            field=models.CharField(blank=True, max_length=100),
        ),
        migrations.AlterField(
            model_name='operationalreading',
            name='measurement_identifier',
            field=models.CharField(blank=True, max_length=100),
        ),
        migrations.AlterField(
            model_name='operationalreading',
            name='measurement_type',
            field=models.CharField(blank=True, max_length=100),
        ),
        migrations.AlterField(
            model_name='operationalreading',
            name='owning_organization',
            field=models.CharField(blank=True, max_length=100),
        ),
    ]
