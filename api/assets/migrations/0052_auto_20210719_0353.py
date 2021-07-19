# Generated by Django 2.2 on 2021-07-19 03:53

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('assets', '0051_auto_20210613_1339'),
    ]

    operations = [
        migrations.AlterField(
            model_name='assetregistrationbk',
            name='status',
            field=models.CharField(choices=[('TP', 'To Process'), ('CO', 'Completed'), ('IC', 'Incomplete'), ('NP', 'New Process'), ('PR', 'Processed'), ('AP', 'Approved'), ('RJ', 'Rejected')], default='IC', max_length=2),
        ),
    ]
