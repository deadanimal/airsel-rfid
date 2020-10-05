# -*- coding: utf-8 -*-
from __future__ import unicode_literals
import uuid, datetime

from django.contrib.gis.db import models
from django.core.validators import MaxValueValidator, MinValueValidator

from simple_history.models import HistoricalRecords

from assets.models import (
    Asset
)
from medias.models import (
    Media
)
from users.models import (
    CustomUser
)

from core.helpers import PathAndRename

class OwningOrganization(models.Model):

    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    name = models.CharField(max_length=100, default='NA')
    description = models.CharField(max_length=255, default='NA')
    detail_description = models.TextField()

    record_by = models.ForeignKey(CustomUser, on_delete=models.CASCADE, related_name='%(app_label)s_%(class)s_record_by')
    record_date = models.DateTimeField(auto_now_add=True)
    modified_by = models.ForeignKey(CustomUser, on_delete=models.CASCADE, related_name='%(app_label)s_%(class)s_modified_by')
    modified_date = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['-record_date']

    def __str__(self):
        return self.name


class Bo(models.Model):

    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    name = models.CharField(max_length=100, default='NA')
    description = models.CharField(max_length=255, default='NA')
    status = models.BooleanField(default=True)

    record_by = models.ForeignKey(CustomUser, on_delete=models.CASCADE, related_name='%(app_label)s_%(class)s_record_by')
    record_date = models.DateTimeField(auto_now_add=True)
    modified_by = models.ForeignKey(CustomUser, on_delete=models.CASCADE, related_name='%(app_label)s_%(class)s_modified_by')
    modified_date = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['-record_date']

    def __str__(self):
        return self.name


class Maintenance(models.Model):

    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    serial_num = models.CharField(max_length=100, default='NA')

    created_at = models.DateTimeField(auto_now_add=True)
    modified_at = models.DateTimeField(auto_now=True)

    class meta:
        ordering = ['-created_at']
    
    def __str__(self):
        return self.serial_num


class IssueType(models.Model):

    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    name = models.CharField(max_length=100, default='NA')

    created_at = models.DateTimeField(auto_now_add=True)
    modified_at = models.DateTimeField(auto_now=True)

    class meta:
        ordering = ['name']
    
    def __str__(self):
        return self.name

class WorkOrder(models.Model):
    
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    wams_id = models.CharField(max_length=100, default='NA')
    work_order_description = models.CharField(max_length=100, default='NA')
    planner_cd = models.CharField(max_length=100, default='NA')
    planner_name = models.CharField(max_length=100, default='NA')
    work_order_no = models.CharField(max_length=100, default='NA')
    completed_at = models.DateTimeField(blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)
    modified_at = models.DateTimeField(auto_now=True)

    class meta:
        ordering = ['planner_name']
    
    def __str__(self):
        #return "{} {} {}".format(self.name, self.activity, self.created_at)
        return self.wams_id

class WorkActivity(models.Model):

    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
<<<<<<< Updated upstream
    wams_work_id = models.CharField(max_length=100, default='NA')
    work_order = models.ForeignKey(WorkOrder, on_delete=models.CASCADE, null=True, related_name='work_activity_work_order_no')
    completed_at = models.DateTimeField(blank=True, null=True)

    maintenance_form = models.ForeignKey(
        Maintenance,
        on_delete=models.CASCADE,
        null=True,
        related_name='work_activity_maintenance_form'
    )
    asset = models.ForeignKey(Asset, on_delete=models.CASCADE, null=True, related_name='work_activity_asset')

    WORK_CATEGORY = [
        ('CM', 'Corrective Maintenance'),
        ('CP', 'Compliance'),
        ('DP', 'Disposal'),
        ('IT', 'Installation Testing Commisioning'),
        ('PD', 'Predictive Maintenance'),
        ('PM', 'Preventive Maintenance'),
        ('RD', 'Redesign')
    ]
    work_category = models.CharField(max_length=2, choices=WORK_CATEGORY, default='IT')

    ACTIVITY_TYPE = [
        ('PM', 'PREVENTIVE-MAINTENANCE'),
        ('PI', 'PUMP-INSPECTION'),
        ('MI', 'MOTOR-INSPECTION'),
        ('SP', 'STARTER-PANEL-INSPECTION')
    ]
    activity_type = models.CharField(max_length=2, choices=ACTIVITY_TYPE, default='IT')
    activity_description = models.CharField(max_length=100, default='NA')

    STATUS = [
        ('BL', 'Backlog'),
        ('IP', 'In Progress'),
        ('NW', 'New'),
        ('CP', 'Completed')
    ]
    status = models.CharField(max_length=2, choices=STATUS, default='NW')
    due_date = models.DateTimeField(blank=True, null=True)

    created_at = models.DateTimeField(auto_now_add=True)
    modified_at = models.DateTimeField(auto_now=True)
=======
    activity_id = models.CharField(max_length=50, default='NA')
    completion_date_time = models.DateTimeField(default=datetime.datetime.now())
    node_id = models.CharField(max_length=50, default='NA')
    asset_id = models.CharField(max_length=50, default='NA')
    participation = models.CharField(max_length=50, default='NA')
    service_history_type = models.CharField(max_length=50, default='NA')
    effective_date_time = models.DateTimeField(default=datetime.datetime.now())
    start_date_time = models.DateTimeField(default=datetime.datetime.now())
    end_date_time = models.DateTimeField(default=datetime.datetime.now())
    comments = models.TextField()
    failure_type = models.CharField(max_length=50, default='NA')
    failure_mode = models.CharField(max_length=50, default='NA')
    failure_repair = models.CharField(max_length=50, default='NA')
    failure_component = models.CharField(max_length=50, default='NA')
    failure_root_cause = models.TextField()
    service_history_type = models.CharField(max_length=50, default='NA')
    effective_date_time = models.DateTimeField(default=datetime.datetime.now())
    start_date_time = models.DateTimeField(default=datetime.datetime.now())
    end_date_time = models.DateTimeField(default=datetime.datetime.now())
    comments = models.TextField()
    measurement_type = models.CharField(max_length=50, default='NA')
    reading_type = models.CharField(max_length=50, default='NA')
    reading_date_time = models.DateTimeField(default=datetime.datetime.now())
    current_value = models.DecimalField(decimal_places=2, max_digits=6, default=0.00)

    record_by = models.ForeignKey(CustomUser, on_delete=models.CASCADE, related_name='%(app_label)s_%(class)s_record_by')
    record_date = models.DateTimeField(auto_now_add=True)
    modified_by = models.ForeignKey(CustomUser, on_delete=models.CASCADE, related_name='%(app_label)s_%(class)s_modified_by')
    modified_date = models.DateTimeField(auto_now=True)
>>>>>>> Stashed changes

    class meta:
        ordering = ['work_order']
    
    def __str__(self):
        #return "{} {} {}".format(self.name, self.activity, self.created_at)
        return self.wams_work_id


class WorkActivityTeam(models.Model):

    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    work_activity = models.ForeignKey(
        WorkActivity,
        on_delete=models.CASCADE,
        null=True,
        related_name='work_activity_team_wa'
    )
    teammate = models.ManyToManyField(
        CustomUser,
        related_name='work_activity_teammate',
        limit_choices_to={
            'user_type': 'TC'
        }
    )
    
    created_at = models.DateTimeField(auto_now_add=True)
    modified_at = models.DateTimeField(auto_now=True)

    class meta:
        ordering = ['-created_at']
    
    def __str__(self):
        return "{}".format(self.work_activity)

class WorkClass(models.Model):

    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    name = models.CharField(max_length=100, default='NA')
    description = models.CharField(max_length=255, default='NA')

    record_by = models.ForeignKey(CustomUser, on_delete=models.CASCADE, related_name='%(app_label)s_%(class)s_record_by')
    record_date = models.DateTimeField(auto_now_add=True)
    modified_by = models.ForeignKey(CustomUser, on_delete=models.CASCADE, related_name='%(app_label)s_%(class)s_modified_by')
    modified_date = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['-record_date']

    def __str__(self):
        return self.name


class WorkCategory(models.Model):
    
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    name = models.CharField(max_length=100, default='NA')
    description = models.CharField(max_length=255, default='NA')
    detail_description = models.TextField()
    status = models.BooleanField(default=True)

    record_by = models.ForeignKey(CustomUser, on_delete=models.CASCADE, related_name='%(app_label)s_%(class)s_record_by')
    record_date = models.DateTimeField(auto_now_add=True)
    modified_by = models.ForeignKey(CustomUser, on_delete=models.CASCADE, related_name='%(app_label)s_%(class)s_modified_by')
    modified_date = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['-record_date']

    def __str__(self):
        return self.name


class WorkRequest(models.Model):

    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    description = models.CharField(max_length=255, default='NA')
    long_description = models.TextField()
    required_by_date = models.DateField(default=datetime.date.today)
    bo = models.ForeignKey(Bo, on_delete=models.CASCADE, related_name='work_request_bo')
    creation_date_time = models.DateTimeField(default=datetime.datetime.now(), blank=True)
    creation_user = models.ForeignKey(CustomUser, on_delete=models.CASCADE, related_name='work_request_creation_user')
    down_time_start = models.DateTimeField(default=datetime.datetime.now(), blank=True)
    planner = models.ForeignKey(CustomUser, on_delete=models.CASCADE, related_name='work_request_planner')
    work_class = models.ForeignKey(WorkClass, on_delete=models.CASCADE, related_name='work_request_work_class')
    work_category = models.ForeignKey(WorkCategory, on_delete=models.CASCADE, related_name='work_request_work_category')
    work_priority = models.CharField(max_length=10, default='1')
    requestor = models.ForeignKey(CustomUser, on_delete=models.CASCADE, related_name='work_request_requestor')
    owning_access_group = models.ForeignKey(OwningOrganization, on_delete=models.CASCADE, related_name='work_request_owning_access_group')
    first_name = models.CharField(max_length=100, default='NA')
    last_name = models.CharField(max_length=100, default='NA')
    primary_phone = models.CharField(max_length=20, default='NA')
    mobile_phone = models.CharField(max_length=20, default='NA')
    home_phone = models.CharField(max_length=20, default='NA')
    node_id = models.CharField(max_length=50, default='NA')
    asset_id = models.CharField(max_length=50, default='NA')
    attachment = models.ForeignKey(
        Media,
        on_delete=models.CASCADE,
        null=True,
        related_name='work_request_attachment'
    )

    record_by = models.ForeignKey(CustomUser, on_delete=models.CASCADE, related_name='%(app_label)s_%(class)s_record_by')
    record_date = models.DateTimeField(auto_now_add=True)
    modified_by = models.ForeignKey(CustomUser, on_delete=models.CASCADE, related_name='%(app_label)s_%(class)s_modified_by')
    modified_date = models.DateTimeField(auto_now=True)

    class meta:
        ordering = ['-record_date']
    
    def __str__(self):
        return self.description


class WorkRequestStatus(models.Model):
    
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    work_request_id = models.ForeignKey(WorkRequest, on_delete=models.CASCADE, related_name='work_request_status_work_request_id')
    status = models.CharField(max_length=50, default='NA')
    
    record_by = models.ForeignKey(CustomUser, on_delete=models.CASCADE, related_name='%(app_label)s_%(class)s_record_by')
    record_date = models.DateTimeField(auto_now_add=True)
    modified_by = models.ForeignKey(CustomUser, on_delete=models.CASCADE, related_name='%(app_label)s_%(class)s_modified_by')
    modified_date = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['-record_date']

    def __str__(self):
        return self.status


class MeasurementIdentifier(models.Model):

    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    name = models.CharField(max_length=100, default='NA')
    description = models.CharField(max_length=255, default='NA')
    detail_description = models.TextField()
    
    record_by = models.ForeignKey(CustomUser, on_delete=models.CASCADE, related_name='%(app_label)s_%(class)s_record_by')
    record_date = models.DateTimeField(auto_now_add=True)
    modified_by = models.ForeignKey(CustomUser, on_delete=models.CASCADE, related_name='%(app_label)s_%(class)s_modified_by')
    modified_date = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['-record_date']

    def __str__(self):
        return self.name


class MeasurementType(models.Model):
    
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    identifier = models.ForeignKey(MeasurementIdentifier, on_delete=models.CASCADE, related_name='measurement_type_identifier')
    name = models.CharField(max_length=100, default='NA')
    description = models.CharField(max_length=255, default='NA')
    
    record_by = models.ForeignKey(CustomUser, on_delete=models.CASCADE, related_name='%(app_label)s_%(class)s_record_by')
    record_date = models.DateTimeField(auto_now_add=True)
    modified_by = models.ForeignKey(CustomUser, on_delete=models.CASCADE, related_name='%(app_label)s_%(class)s_modified_by')
    modified_date = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['-record_date']

    def __str__(self):
        return self.name


class OperationalReading(models.Model):

    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    # asset = models.ForeignKey(
    #     Asset,
    #     on_delete=models.CASCADE,
    #     null=True,
    #     related_name='operational_reading_asset'
    # )
    asset_id = models.CharField(max_length=50, default='NA')
    badge_number = models.CharField(max_length=50, default='NA')
    current_value = models.DecimalField(decimal_places=2, max_digits=6, default=0.00)
    reading_date_time = models.DateTimeField(default=datetime.datetime.now())
    measurement_identifier = models.ForeignKey(MeasurementIdentifier, on_delete=models.CASCADE, related_name='operational_reading_measurement_identifier')
    measurement_type = models.ForeignKey(MeasurementType, on_delete=models.CASCADE, related_name='operational_reading_measurement_type')
    owning_organization = models.ForeignKey(OwningOrganization, on_delete=models.CASCADE, related_name='operational_reading_owning_organization')

    record_by = models.ForeignKey(CustomUser, on_delete=models.CASCADE, related_name='%(app_label)s_%(class)s_record_by')
    record_date = models.DateTimeField(auto_now_add=True)
    modified_by = models.ForeignKey(CustomUser, on_delete=models.CASCADE, related_name='%(app_label)s_%(class)s_modified_by')
    modified_date = models.DateTimeField(auto_now=True)

    class meta:
        ordering = ['-record_date']
    
    def __str__(self):
        return self.asset_id

