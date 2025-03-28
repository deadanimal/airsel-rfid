# Generated by Django 2.2.6 on 2020-10-08 23:32

import datetime
from django.db import migrations, models
import uuid


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Bo',
            fields=[
                ('id', models.UUIDField(default=uuid.uuid4, editable=False, primary_key=True, serialize=False)),
                ('name', models.CharField(default='NA', max_length=100)),
                ('description', models.CharField(default='NA', max_length=255)),
                ('status', models.BooleanField(default=True)),
                ('record_date', models.DateTimeField(auto_now_add=True)),
                ('modified_date', models.DateTimeField(auto_now=True)),
            ],
            options={
                'ordering': ['-record_date'],
            },
        ),
        migrations.CreateModel(
            name='IssueType',
            fields=[
                ('id', models.UUIDField(default=uuid.uuid4, editable=False, primary_key=True, serialize=False)),
                ('name', models.CharField(default='NA', max_length=100)),
                ('created_at', models.DateTimeField(auto_now_add=True, null=True)),
                ('modified_at', models.DateTimeField(auto_now=True, null=True)),
            ],
        ),
        migrations.CreateModel(
            name='Maintenance',
            fields=[
                ('id', models.UUIDField(default=uuid.uuid4, editable=False, primary_key=True, serialize=False)),
                ('serial_num', models.CharField(default='NA', max_length=100)),
                ('created_at', models.DateTimeField(auto_now_add=True, null=True)),
                ('modified_at', models.DateTimeField(auto_now=True, null=True)),
            ],
        ),
        migrations.CreateModel(
            name='MeasurementType',
            fields=[
                ('id', models.UUIDField(default=uuid.uuid4, editable=False, primary_key=True, serialize=False)),
                ('measurement_identifier', models.CharField(default='NA', max_length=100)),
                ('measurement_type', models.CharField(default='NA', max_length=100)),
                ('description', models.CharField(default='NA', max_length=255)),
                ('record_date', models.DateTimeField(auto_now_add=True)),
                ('modified_date', models.DateTimeField(auto_now=True)),
            ],
            options={
                'ordering': ['-record_date'],
            },
        ),
        migrations.CreateModel(
            name='OperationalReading',
            fields=[
                ('id', models.UUIDField(default=uuid.uuid4, editable=False, primary_key=True, serialize=False)),
                ('asset_id', models.CharField(default='NA', max_length=50)),
                ('badge_number', models.CharField(default='NA', max_length=50)),
                ('current_value', models.DecimalField(decimal_places=2, default=0.0, max_digits=6)),
                ('reading_date_time', models.DateTimeField(blank=True, null=True)),
                ('measurement_identifier', models.CharField(default='NA', max_length=100)),
                ('measurement_type', models.CharField(default='NA', max_length=100)),
                ('owning_organization', models.CharField(default='NA', max_length=50)),
                ('record_date', models.DateTimeField(auto_now_add=True)),
                ('modified_date', models.DateTimeField(auto_now=True)),
            ],
        ),
        migrations.CreateModel(
            name='OwningOrganization',
            fields=[
                ('id', models.UUIDField(default=uuid.uuid4, editable=False, primary_key=True, serialize=False)),
                ('name', models.CharField(default='NA', max_length=100)),
                ('description', models.CharField(default='NA', max_length=255)),
                ('detail_description', models.TextField(default='NA')),
                ('record_date', models.DateTimeField(auto_now_add=True)),
                ('modified_date', models.DateTimeField(auto_now=True)),
            ],
            options={
                'ordering': ['-record_date'],
            },
        ),
        migrations.CreateModel(
            name='WorkActivity',
            fields=[
                ('id', models.UUIDField(default=uuid.uuid4, editable=False, primary_key=True, serialize=False)),
                ('activity_id', models.CharField(default='NA', max_length=50)),
                ('completion_date_time', models.DateTimeField(blank=True, null=True)),
                ('node_id', models.CharField(default='NA', max_length=50)),
                ('asset_id', models.CharField(default='NA', max_length=50)),
                ('participation', models.CharField(default='NA', max_length=50)),
                ('failure_type', models.CharField(default='NA', max_length=50)),
                ('failure_mode', models.CharField(default='NA', max_length=50)),
                ('failure_repair', models.CharField(default='NA', max_length=50)),
                ('failure_component', models.CharField(default='NA', max_length=50)),
                ('failure_root_cause', models.TextField(default='NA')),
                ('service_history_type', models.CharField(default='NA', max_length=50)),
                ('effective_date_time', models.DateTimeField(blank=True, null=True)),
                ('start_date_time', models.DateTimeField(blank=True, null=True)),
                ('end_date_time', models.DateTimeField(blank=True, null=True)),
                ('comments', models.TextField(default='NA')),
                ('measurement_type', models.CharField(default='NA', max_length=50)),
                ('reading_type', models.CharField(default='NA', max_length=50)),
                ('reading_date_time', models.DateTimeField(blank=True, null=True)),
                ('current_value', models.DecimalField(decimal_places=2, default=0.0, max_digits=6)),
                ('record_date', models.DateTimeField(auto_now_add=True)),
                ('modified_date', models.DateTimeField(auto_now=True)),
            ],
        ),
        migrations.CreateModel(
            name='WorkActivityTeam',
            fields=[
                ('id', models.UUIDField(default=uuid.uuid4, editable=False, primary_key=True, serialize=False)),
                ('created_at', models.DateTimeField(auto_now_add=True, null=True)),
                ('modified_at', models.DateTimeField(auto_now=True, null=True)),
            ],
        ),
        migrations.CreateModel(
            name='WorkCategory',
            fields=[
                ('id', models.UUIDField(default=uuid.uuid4, editable=False, primary_key=True, serialize=False)),
                ('name', models.CharField(default='NA', max_length=100)),
                ('description', models.CharField(default='NA', max_length=255)),
                ('detail_description', models.TextField(default='NA')),
                ('status', models.BooleanField(default=True)),
                ('record_date', models.DateTimeField(auto_now_add=True)),
                ('modified_date', models.DateTimeField(auto_now=True)),
            ],
            options={
                'ordering': ['-record_date'],
            },
        ),
        migrations.CreateModel(
            name='WorkClass',
            fields=[
                ('id', models.UUIDField(default=uuid.uuid4, editable=False, primary_key=True, serialize=False)),
                ('name', models.CharField(default='NA', max_length=100)),
                ('description', models.CharField(default='NA', max_length=255)),
                ('record_date', models.DateTimeField(auto_now_add=True)),
                ('modified_date', models.DateTimeField(auto_now=True)),
            ],
            options={
                'ordering': ['-record_date'],
            },
        ),
        migrations.CreateModel(
            name='WorkOrder',
            fields=[
                ('id', models.UUIDField(default=uuid.uuid4, editable=False, primary_key=True, serialize=False)),
                ('wams_id', models.CharField(default='NA', max_length=100)),
                ('work_order_description', models.CharField(default='NA', max_length=100)),
                ('planner_cd', models.CharField(default='NA', max_length=100)),
                ('planner_name', models.CharField(default='NA', max_length=100)),
                ('work_order_no', models.CharField(default='NA', max_length=100)),
                ('completed_at', models.DateTimeField(blank=True, null=True)),
                ('created_at', models.DateTimeField(auto_now_add=True, null=True)),
                ('modified_at', models.DateTimeField(auto_now=True, null=True)),
            ],
        ),
        migrations.CreateModel(
            name='WorkRequest',
            fields=[
                ('id', models.UUIDField(default=uuid.uuid4, editable=False, primary_key=True, serialize=False)),
                ('description', models.CharField(default='NA', max_length=255)),
                ('long_description', models.TextField(default='NA')),
                ('required_by_date', models.DateField(default=datetime.date.today)),
                ('bo', models.CharField(default='NA', max_length=100)),
                ('creation_date_time', models.DateTimeField(blank=True)),
                ('creation_user', models.CharField(default='NA', max_length=100)),
                ('down_time_start', models.DateTimeField(blank=True, null=True)),
                ('planner', models.CharField(default='NA', max_length=100)),
                ('work_class', models.CharField(default='NA', max_length=100)),
                ('work_category', models.CharField(default='NA', max_length=100)),
                ('work_priority', models.CharField(default='01', max_length=10)),
                ('requestor', models.CharField(default='NA', max_length=100)),
                ('owning_access_group', models.CharField(default='NA', max_length=100)),
                ('first_name', models.CharField(default='NA', max_length=100)),
                ('last_name', models.CharField(default='NA', max_length=100)),
                ('primary_phone', models.CharField(default='NA', max_length=20)),
                ('mobile_phone', models.CharField(default='NA', max_length=20)),
                ('home_phone', models.CharField(default='NA', max_length=20)),
                ('node_id', models.CharField(default='NA', max_length=50)),
                ('asset_id', models.CharField(default='NA', max_length=50)),
                ('record_date', models.DateTimeField(auto_now_add=True)),
                ('modified_date', models.DateTimeField(auto_now=True)),
            ],
        ),
        migrations.CreateModel(
            name='WorkRequestStatus',
            fields=[
                ('id', models.UUIDField(default=uuid.uuid4, editable=False, primary_key=True, serialize=False)),
                ('status', models.CharField(default='NA', max_length=50)),
                ('record_date', models.DateTimeField(auto_now_add=True)),
                ('modified_date', models.DateTimeField(auto_now=True)),
            ],
            options={
                'ordering': ['-record_date'],
            },
        ),
    ]
