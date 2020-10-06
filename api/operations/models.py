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
    detail_description = models.TextField(null=True)

    record_by = models.ForeignKey(CustomUser, on_delete=models.CASCADE, related_name='%(app_label)s_%(class)s_record_by', null=True)
    record_date = models.DateTimeField(auto_now_add=True, null=True)
    modified_by = models.ForeignKey(CustomUser, on_delete=models.CASCADE, related_name='%(app_label)s_%(class)s_modified_by', null=True)
    modified_date = models.DateTimeField(auto_now=True, null=True)

    class Meta:
        ordering = ['-record_date']

    def __str__(self):
        return self.name


class Bo(models.Model):

    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    name = models.CharField(max_length=100, default='NA')
    description = models.CharField(max_length=255, default='NA')
    status = models.BooleanField(default=True)

    record_by = models.ForeignKey(CustomUser, on_delete=models.CASCADE, related_name='%(app_label)s_%(class)s_record_by', null=True)
    record_date = models.DateTimeField(auto_now_add=True, null=True)
    modified_by = models.ForeignKey(CustomUser, on_delete=models.CASCADE, related_name='%(app_label)s_%(class)s_modified_by', null=True)
    modified_date = models.DateTimeField(auto_now=True, null=True)

    class Meta:
        ordering = ['-record_date']

    def __str__(self):
        return self.name


class Maintenance(models.Model):

    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    serial_num = models.CharField(max_length=100, default='NA')

    created_at = models.DateTimeField(auto_now_add=True, null=True)
    modified_at = models.DateTimeField(auto_now=True, null=True)

    class meta:
        ordering = ['-created_at']
    
    def __str__(self):
        return self.serial_num


class IssueType(models.Model):

    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    name = models.CharField(max_length=100, default='NA')

    created_at = models.DateTimeField(auto_now_add=True, null=True)
    modified_at = models.DateTimeField(auto_now=True, null=True)

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
    created_at = models.DateTimeField(auto_now_add=True, null=True)
    modified_at = models.DateTimeField(auto_now=True, null=True)

    class meta:
        ordering = ['planner_name']
    
    def __str__(self):
        #return "{} {} {}".format(self.name, self.activity, self.created_at)
        return self.wams_id

class WorkActivity(models.Model):

    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    activity_id = models.CharField(max_length=50, default='NA')
    completion_date_time = models.DateTimeField(auto_now_add=True, null=True)
    node_id = models.CharField(max_length=50, default='NA')
    asset_id = models.CharField(max_length=50, default='NA')
    participation = models.CharField(max_length=50, default='NA')
    service_history_type = models.CharField(max_length=50, default='NA')
    effective_date_time = models.DateTimeField(auto_now_add=True, null=True)
    start_date_time = models.DateTimeField(auto_now_add=True, null=True)
    end_date_time = models.DateTimeField(auto_now_add=True, null=True)
    comments = models.TextField(null=True)
    failure_type = models.CharField(max_length=50, default='NA')
    failure_mode = models.CharField(max_length=50, default='NA')
    failure_repair = models.CharField(max_length=50, default='NA')
    failure_component = models.CharField(max_length=50, default='NA')
    failure_root_cause = models.TextField(null=True)
    service_history_type = models.CharField(max_length=50, default='NA')
    effective_date_time = models.DateTimeField(auto_now_add=True, null=True)
    start_date_time = models.DateTimeField(auto_now_add=True, null=True)
    end_date_time = models.DateTimeField(auto_now_add=True, null=True)
    comments = models.TextField(null=True)
    measurement_type = models.CharField(max_length=50, default='NA')
    reading_type = models.CharField(max_length=50, default='NA')
    reading_date_time = models.DateTimeField(auto_now_add=True, null=True)
    current_value = models.DecimalField(decimal_places=2, max_digits=6, default=0.00)

    record_by = models.ForeignKey(CustomUser, on_delete=models.CASCADE, related_name='%(app_label)s_%(class)s_record_by', null=True)
    record_date = models.DateTimeField(auto_now_add=True, null=True)
    modified_by = models.ForeignKey(CustomUser, on_delete=models.CASCADE, related_name='%(app_label)s_%(class)s_modified_by', null=True)
    modified_date = models.DateTimeField(auto_now=True, null=True)

    class meta:
        ordering = ['work_order']
    
    def __str__(self):
        #return "{} {} {}".format(self.name, self.activity, self.created_at)
        return self.activity_id


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
    
    created_at = models.DateTimeField(auto_now_add=True, null=True)
    modified_at = models.DateTimeField(auto_now=True, null=True)

    class meta:
        ordering = ['-created_at']
    
    def __str__(self):
        return "{}".format(self.work_activity)

class WorkClass(models.Model):

    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    name = models.CharField(max_length=100, default='NA')
    description = models.CharField(max_length=255, default='NA')

    record_by = models.ForeignKey(CustomUser, on_delete=models.CASCADE, related_name='%(app_label)s_%(class)s_record_by', null=True)
    record_date = models.DateTimeField(auto_now_add=True, null=True)
    modified_by = models.ForeignKey(CustomUser, on_delete=models.CASCADE, related_name='%(app_label)s_%(class)s_modified_by', null=True)
    modified_date = models.DateTimeField(auto_now=True, null=True)

    class Meta:
        ordering = ['-record_date']

    def __str__(self):
        return self.name


class WorkCategory(models.Model):
    
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    name = models.CharField(max_length=100, default='NA')
    description = models.CharField(max_length=255, default='NA')
    detail_description = models.TextField(null=True)
    status = models.BooleanField(default=True)

    record_by = models.ForeignKey(CustomUser, on_delete=models.CASCADE, related_name='%(app_label)s_%(class)s_record_by', null=True)
    record_date = models.DateTimeField(auto_now_add=True, null=True)
    modified_by = models.ForeignKey(CustomUser, on_delete=models.CASCADE, related_name='%(app_label)s_%(class)s_modified_by', null=True)
    modified_date = models.DateTimeField(auto_now=True, null=True)

    class Meta:
        ordering = ['-record_date']

    def __str__(self):
        return self.name


class WorkRequest(models.Model):

    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    description = models.CharField(max_length=255, default='NA')
    long_description = models.TextField(null=True)
    required_by_date = models.DateField(default=datetime.date.today)
    bo = models.ForeignKey(Bo, on_delete=models.CASCADE, related_name='work_request_bo', null=True)
    creation_date_time = models.DateTimeField(auto_now_add=True, null=True, blank=True)
    creation_user = models.ForeignKey(CustomUser, on_delete=models.CASCADE, related_name='work_request_creation_user', null=True)
    down_time_start = models.DateTimeField(auto_now_add=True, null=True, blank=True)
    planner = models.ForeignKey(CustomUser, on_delete=models.CASCADE, related_name='work_request_planner', null=True)
    work_class = models.ForeignKey(WorkClass, on_delete=models.CASCADE, related_name='work_request_work_class', null=True)
    work_category = models.ForeignKey(WorkCategory, on_delete=models.CASCADE, related_name='work_request_work_category', null=True)
    work_priority = models.CharField(max_length=10, default='1')
    requestor = models.ForeignKey(CustomUser, on_delete=models.CASCADE, related_name='work_request_requestor', null=True)
    owning_access_group = models.ForeignKey(OwningOrganization, on_delete=models.CASCADE, related_name='work_request_owning_access_group', null=True)
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

    record_by = models.ForeignKey(CustomUser, on_delete=models.CASCADE, related_name='%(app_label)s_%(class)s_record_by', null=True)
    record_date = models.DateTimeField(auto_now_add=True, null=True)
    modified_by = models.ForeignKey(CustomUser, on_delete=models.CASCADE, related_name='%(app_label)s_%(class)s_modified_by', null=True)
    modified_date = models.DateTimeField(auto_now=True, null=True)

    class meta:
        ordering = ['-record_date']
    
    def __str__(self):
        return self.description


class WorkRequestStatus(models.Model):
    
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    work_request_id = models.ForeignKey(WorkRequest, on_delete=models.CASCADE, related_name='work_request_status_work_request_id', null=True)
    status = models.CharField(max_length=50, default='NA')
    
    record_by = models.ForeignKey(CustomUser, on_delete=models.CASCADE, related_name='%(app_label)s_%(class)s_record_by', null=True)
    record_date = models.DateTimeField(auto_now_add=True, null=True)
    modified_by = models.ForeignKey(CustomUser, on_delete=models.CASCADE, related_name='%(app_label)s_%(class)s_modified_by', null=True)
    modified_date = models.DateTimeField(auto_now=True, null=True)

    class Meta:
        ordering = ['-record_date']

    def __str__(self):
        return self.status


class MeasurementIdentifier(models.Model):

    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    name = models.CharField(max_length=100, default='NA')
    description = models.CharField(max_length=255, default='NA')
    detail_description = models.TextField(null=True)
    
    record_by = models.ForeignKey(CustomUser, on_delete=models.CASCADE, related_name='%(app_label)s_%(class)s_record_by', null=True)
    record_date = models.DateTimeField(auto_now_add=True, null=True)
    modified_by = models.ForeignKey(CustomUser, on_delete=models.CASCADE, related_name='%(app_label)s_%(class)s_modified_by', null=True)
    modified_date = models.DateTimeField(auto_now=True, null=True)

    class Meta:
        ordering = ['-record_date']

    def __str__(self):
        return self.name


class MeasurementType(models.Model):
    
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    identifier = models.ForeignKey(MeasurementIdentifier, on_delete=models.CASCADE, related_name='measurement_type_identifier', null=True)
    name = models.CharField(max_length=100, default='NA')
    description = models.CharField(max_length=255, default='NA')
    
    record_by = models.ForeignKey(CustomUser, on_delete=models.CASCADE, related_name='%(app_label)s_%(class)s_record_by', null=True)
    record_date = models.DateTimeField(auto_now_add=True, null=True)
    modified_by = models.ForeignKey(CustomUser, on_delete=models.CASCADE, related_name='%(app_label)s_%(class)s_modified_by', null=True)
    modified_date = models.DateTimeField(auto_now=True, null=True)

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
    reading_date_time = models.DateTimeField(auto_now_add=True, null=True)
    measurement_identifier = models.ForeignKey(MeasurementIdentifier, on_delete=models.CASCADE, related_name='operational_reading_measurement_identifier', null=True)
    measurement_type = models.ForeignKey(MeasurementType, on_delete=models.CASCADE, related_name='operational_reading_measurement_type', null=True)
    owning_organization = models.ForeignKey(OwningOrganization, on_delete=models.CASCADE, related_name='operational_reading_owning_organization', null=True)

    record_by = models.ForeignKey(CustomUser, on_delete=models.CASCADE, related_name='%(app_label)s_%(class)s_record_by', null=True)
    record_date = models.DateTimeField(auto_now_add=True, null=True)
    modified_by = models.ForeignKey(CustomUser, on_delete=models.CASCADE, related_name='%(app_label)s_%(class)s_modified_by', null=True)
    modified_date = models.DateTimeField(auto_now=True, null=True)

    class meta:
        ordering = ['-record_date']
    
    def __str__(self):
        return self.asset_id

