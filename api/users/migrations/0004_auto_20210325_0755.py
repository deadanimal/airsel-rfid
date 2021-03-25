# Generated by Django 2.2.6 on 2021-03-25 07:55

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('users', '0003_customuser_department'),
    ]

    operations = [
        migrations.AlterField(
            model_name='customuser',
            name='employee_id',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, related_name='users_customuser_employee_id', to='employee.Employee'),
        ),
    ]
