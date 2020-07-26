# Generated by Django 2.2.6 on 2020-07-26 16:10

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('assets', '0006_asset_created_by'),
    ]

    operations = [
        migrations.AddField(
            model_name='asset',
            name='approval_at',
            field=models.DateTimeField(blank=True, null=True),
        ),
        migrations.AddField(
            model_name='asset',
            name='approval_by',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, related_name='asset_approval_by', to=settings.AUTH_USER_MODEL),
        ),
        migrations.AddField(
            model_name='asset',
            name='approval_status',
            field=models.CharField(choices=[('AP', 'Approve'), ('RE', 'Reject'), ('NA', 'Not Available')], default='NA', max_length=2),
        ),
        migrations.AddField(
            model_name='asset',
            name='asset_description',
            field=models.CharField(default='NA', max_length=100),
        ),
        migrations.AddField(
            model_name='asset',
            name='badge_number',
            field=models.CharField(default='NA', max_length=100),
        ),
        migrations.AddField(
            model_name='asset',
            name='modified_by',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, related_name='asset_modified_by', to=settings.AUTH_USER_MODEL),
        ),
        migrations.AddField(
            model_name='asset',
            name='qrcode',
            field=models.CharField(default='NA', max_length=100),
        ),
        migrations.AddField(
            model_name='asset',
            name='reject_remark',
            field=models.CharField(default='NA', max_length=100),
        ),
    ]
