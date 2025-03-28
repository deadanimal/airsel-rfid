# Generated by Django 2.2.6 on 2021-01-18 16:55

from django.db import migrations, models
import uuid


class Migration(migrations.Migration):

    dependencies = [
        ('operations', '0015_merge_20201013_2126'),
    ]

    operations = [
        migrations.CreateModel(
            name='AssetLocationAssetListServiceHistories',
            fields=[
                ('id', models.UUIDField(default=uuid.uuid4, editable=False, primary_key=True, serialize=False)),
                ('service_history_type', models.CharField(blank=True, max_length=100)),
                ('effective_datetime', models.DateTimeField(auto_now=True)),
                ('start_date_time', models.DateTimeField(auto_now=True)),
                ('end_date_time', models.DateTimeField(auto_now=True)),
                ('comments', models.CharField(blank=True, max_length=100)),
                ('failure_type', models.CharField(blank=True, max_length=100)),
                ('failure_mode', models.CharField(blank=True, max_length=100)),
                ('failure_repair', models.CharField(blank=True, max_length=100)),
                ('failure_component', models.CharField(blank=True, max_length=100)),
                ('failure_root_cause', models.CharField(blank=True, max_length=100)),
                ('created_date', models.DateTimeField(auto_now_add=True)),
                ('modified_date', models.DateTimeField(auto_now=True)),
            ],
        ),
        migrations.CreateModel(
            name='QuestionsValidValue',
            fields=[
                ('id', models.UUIDField(default=uuid.uuid4, editable=False, primary_key=True, serialize=False)),
                ('seq_valid', models.CharField(blank=True, max_length=100)),
                ('code_valid', models.CharField(blank=True, max_length=100)),
                ('short_text_valid', models.CharField(blank=True, max_length=100)),
                ('text_valid', models.CharField(blank=True, max_length=100)),
                ('created_date', models.DateTimeField(auto_now_add=True)),
                ('modified_date', models.DateTimeField(auto_now=True)),
            ],
        ),
        migrations.CreateModel(
            name='WorkOrderActivityCompletionAssetLocationAssetList',
            fields=[
                ('id', models.UUIDField(default=uuid.uuid4, editable=False, primary_key=True, serialize=False)),
                ('node_id', models.CharField(blank=True, max_length=100)),
                ('asset_id', models.CharField(blank=True, max_length=100)),
                ('participation', models.CharField(blank=True, max_length=100)),
                ('measurent_type', models.CharField(blank=True, max_length=100)),
                ('reading_type', models.CharField(blank=True, max_length=100)),
                ('current_value', models.CharField(blank=True, max_length=100)),
                ('reading_datetime', models.DateTimeField(auto_now=True)),
                ('created_date', models.DateTimeField(auto_now_add=True)),
                ('modified_date', models.DateTimeField(auto_now=True)),
                ('service_histories', models.ManyToManyField(null=True, to='operations.AssetLocationAssetListServiceHistories')),
            ],
        ),
        migrations.CreateModel(
            name='WorkOrderActivityCompletion',
            fields=[
                ('id', models.UUIDField(default=uuid.uuid4, editable=False, primary_key=True, serialize=False)),
                ('activityid', models.CharField(blank=True, max_length=100)),
                ('completiondatetime', models.DateTimeField(auto_now=True)),
                ('submitted_datetime', models.DateTimeField(auto_now=True)),
                ('created_date', models.DateTimeField(auto_now_add=True)),
                ('modified_date', models.DateTimeField(auto_now=True)),
                ('asset_location_asset_list', models.ManyToManyField(null=True, to='operations.WorkOrderActivityCompletionAssetLocationAssetList')),
            ],
        ),
        migrations.CreateModel(
            name='ServiceHistoriesQuestions',
            fields=[
                ('id', models.UUIDField(default=uuid.uuid4, editable=False, primary_key=True, serialize=False)),
                ('seq', models.CharField(blank=True, max_length=100)),
                ('code', models.CharField(blank=True, max_length=100)),
                ('short_text', models.CharField(blank=True, max_length=100)),
                ('text', models.CharField(blank=True, max_length=100)),
                ('style', models.CharField(blank=True, max_length=100)),
                ('respone', models.CharField(blank=True, max_length=100)),
                ('response_check_box', models.CharField(blank=True, max_length=100)),
                ('response_radio', models.CharField(blank=True, max_length=100)),
                ('responseDate', models.DateField(null=True)),
                ('response_datetime', models.DateTimeField(auto_now=True)),
                ('created_date', models.DateTimeField(auto_now_add=True)),
                ('modified_date', models.DateTimeField(auto_now=True)),
                ('valid_value', models.ManyToManyField(null=True, to='operations.QuestionsValidValue')),
            ],
        ),
        migrations.AddField(
            model_name='assetlocationassetlistservicehistories',
            name='question',
            field=models.ManyToManyField(null=True, to='operations.ServiceHistoriesQuestions'),
        ),
    ]
