# Generated by Django 2.2.6 on 2020-12-29 15:08

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('assets', '0004_auto_20201229_0211'),
    ]

    operations = [
        migrations.AddField(
            model_name='assetregistration',
            name='badge_no',
            field=models.CharField(blank=True, default='NA', max_length=100, null=True),
        ),
        migrations.AlterField(
            model_name='assetregistration',
            name='status',
            field=models.CharField(choices=[('CO', 'Completed'), ('IC', 'Incomplete'), ('PR', 'Processed'), ('AP', 'Approved'), ('RJ', 'Rejected')], default='IC', max_length=2),
        ),
    ]
