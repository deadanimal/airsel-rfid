# Generated by Django 2.2.6 on 2020-07-05 11:24

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('users', '0001_initial'),
    ]

    operations = [
        migrations.AlterModelOptions(
            name='customuser',
            options={'ordering': ['name']},
        ),
        migrations.RemoveField(
            model_name='customuser',
            name='birth_date',
        ),
        migrations.RemoveField(
            model_name='customuser',
            name='home_number',
        ),
        migrations.RemoveField(
            model_name='customuser',
            name='registration_number',
        ),
        migrations.AddField(
            model_name='customuser',
            name='nric',
            field=models.CharField(default='NA', max_length=12),
        ),
        migrations.AddField(
            model_name='customuser',
            name='user_type',
            field=models.CharField(choices=[('OP', 'Operator'), ('SK', 'Store Keeper'), ('SS', 'Store Supervisor'), ('TC', 'Technical Crew')], default='TC', max_length=2),
        ),
    ]
