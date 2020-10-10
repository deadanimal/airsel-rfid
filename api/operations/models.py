# -*- coding: utf-8 -*-
from __future__ import unicode_literals
import uuid, datetime

from django.contrib.gis.db import models
from django.core.validators import MaxValueValidator, MinValueValidator
from django.utils.timezone import now

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
    detail_description = models.TextField(default='NA')

    record_by = models.ForeignKey(CustomUser, on_delete=models.CASCADE, related_name='%(app_label)s_%(class)s_record_by', null=True)
    record_date = models.DateTimeField(auto_now_add=True)
    modified_by = models.ForeignKey(CustomUser, on_delete=models.CASCADE, related_name='%(app_label)s_%(class)s_modified_by', null=True)
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

    record_by = models.ForeignKey(CustomUser, on_delete=models.CASCADE, related_name='%(app_label)s_%(class)s_record_by', null=True)
    record_date = models.DateTimeField(auto_now_add=True)
    modified_by = models.ForeignKey(CustomUser, on_delete=models.CASCADE, related_name='%(app_label)s_%(class)s_modified_by', null=True)
    modified_date = models.DateTimeField(auto_now=True)

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
    bo_status = models.CharField(max_length=100, default='NA')
    required_by_date = models.DateField(default=datetime.date.today)
    activity_id = models.CharField(max_length=50, default='NA')
    work_class = models.CharField(max_length=100, default='NA')
    work_category = models.CharField(max_length=100, default='NA')
    description = models.TextField(default='NA')
    completion_date_time = models.DateTimeField(blank=True, null=True)
    node_id = models.CharField(max_length=50, default='NA')
    asset_id = models.CharField(max_length=50, default='NA')
    asset_type = models.CharField(max_length=50, default='NA')
    badge_number = models.CharField(max_length=50, default='NA')
    serial_number = models.CharField(max_length=50, default='NA')
    detailed_description = models.TextField(default='NA')
    participation = models.CharField(max_length=50, default='NA')
    # service history type: downtime
    service_history_type_dt = models.CharField(max_length=50, default='NA', blank=True)
    effective_date_time_dt = models.DateTimeField(blank=True, null=True)
    comments_dt = models.TextField(default='NA', blank=True)
    start_date_time = models.DateTimeField(blank=True, null=True)
    end_date_time = models.DateTimeField(blank=True, null=True)
    downtime_reason = models.CharField(max_length=50, default='NA')
    # service history type: failure
    service_history_type_f = models.CharField(max_length=50, default='NA', blank=True)
    effective_date_time_f = models.DateTimeField(blank=True, null=True)
    comments_f = models.TextField(default='NA', blank=True)
    failure_type = models.CharField(max_length=50, default='NA', blank=True)
    failure_mode = models.CharField(max_length=50, default='NA', blank=True)
    failure_repair = models.CharField(max_length=50, default='NA', blank=True)
    failure_component = models.CharField(max_length=50, default='NA', blank=True)
    failure_root_cause = models.TextField(default='NA', blank=True)
    # service history type: preventive maintenance
    # service_history_type = models.CharField(max_length=50, default='NA')
    # effective_date_time = models.DateTimeField(blank=True, null=True)
    # start_date_time = models.DateTimeField(blank=True, null=True)
    # end_date_time = models.DateTimeField(blank=True, null=True)
    # comments = models.TextField(default='NA')
    # measurement_type = models.CharField(max_length=50, default='NA')
    # reading_type = models.CharField(max_length=50, default='NA')
    # reading_date_time = models.DateTimeField(blank=True, null=True)
    # current_value = models.DecimalField(decimal_places=2, max_digits=6, default=0.00)

    record_by = models.ForeignKey(CustomUser, on_delete=models.CASCADE, related_name='%(app_label)s_%(class)s_record_by', null=True)
    record_date = models.DateTimeField(auto_now_add=True)
    modified_by = models.ForeignKey(CustomUser, on_delete=models.CASCADE, related_name='%(app_label)s_%(class)s_modified_by', null=True)
    modified_date = models.DateTimeField(auto_now=True)

    class meta:
        ordering = ['required_by_date']
    
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
    record_date = models.DateTimeField(auto_now_add=True)
    modified_by = models.ForeignKey(CustomUser, on_delete=models.CASCADE, related_name='%(app_label)s_%(class)s_modified_by', null=True)
    modified_date = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['-record_date']

    def __str__(self):
        return self.name


class WorkCategory(models.Model):
    
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    name = models.CharField(max_length=100, default='NA')
    description = models.CharField(max_length=255, default='NA')
    detail_description = models.TextField(default='NA')
    status = models.BooleanField(default=True)

    record_by = models.ForeignKey(CustomUser, on_delete=models.CASCADE, related_name='%(app_label)s_%(class)s_record_by', null=True)
    record_date = models.DateTimeField(auto_now_add=True)
    modified_by = models.ForeignKey(CustomUser, on_delete=models.CASCADE, related_name='%(app_label)s_%(class)s_modified_by', null=True)
    modified_date = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['-record_date']

    def __str__(self):
        return self.name


class WorkRequest(models.Model):

    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    description = models.CharField(max_length=255, default='NA')
    long_description = models.TextField(default='NA')
    required_by_date = models.DateField(default=datetime.date.today)
    bo_status = models.CharField(max_length=100, default='NA')
    creation_date_time = models.DateTimeField(blank=True)
    creation_user = models.CharField(max_length=100, default='NA')
    down_time_start = models.DateTimeField(blank=True, null=True)
    planner = models.CharField(max_length=100, default='NA')
    work_class = models.CharField(max_length=100, default='NA')
    work_category = models.CharField(max_length=100, default='NA')
    work_priority = models.CharField(max_length=10, default='01')
    requestor = models.CharField(max_length=100, default='NA')
    owning_access_group = models.CharField(max_length=100, default='NA')
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
    record_date = models.DateTimeField(auto_now_add=True)
    modified_by = models.ForeignKey(CustomUser, on_delete=models.CASCADE, related_name='%(app_label)s_%(class)s_modified_by', null=True)
    modified_date = models.DateTimeField(auto_now=True)

    class meta:
        ordering = ['-record_date']
    
    def __str__(self):
        return self.description


class WorkRequestStatus(models.Model):
    
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    work_request_id = models.ForeignKey(WorkRequest, on_delete=models.CASCADE, related_name='work_request_status_work_request_id', null=True)
    status = models.CharField(max_length=50, default='NA')
    
    record_by = models.ForeignKey(CustomUser, on_delete=models.CASCADE, related_name='work_request_status_record_by', null=True)
    record_date = models.DateTimeField(auto_now_add=True)
    modified_by = models.ForeignKey(CustomUser, on_delete=models.CASCADE, related_name='work_request_status_modified_by', null=True)
    modified_date = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['-record_date']

    def __str__(self):
        return self.status


class MeasurementType(models.Model):
    
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    measurement_identifier = models.CharField(max_length=100, default='NA')
    measurement_type = models.CharField(max_length=100, default='NA')
    description = models.CharField(max_length=255, default='NA')
    
    record_by = models.ForeignKey(CustomUser, on_delete=models.CASCADE, related_name='%(app_label)s_%(class)s_record_by', null=True)
    record_date = models.DateTimeField(auto_now_add=True)
    modified_by = models.ForeignKey(CustomUser, on_delete=models.CASCADE, related_name='%(app_label)s_%(class)s_modified_by', null=True)
    modified_date = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['-record_date']

    def __str__(self):
        return self.measurement_identifier


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
    reading_date_time = models.DateTimeField(blank=True, null=True)
    measurement_identifier = models.CharField(max_length=100, default='NA')
    measurement_type = models.CharField(max_length=100, default='NA')
    owning_organization = models.CharField(max_length=50, default='NA')

    record_by = models.ForeignKey(CustomUser, on_delete=models.CASCADE, related_name='%(app_label)s_%(class)s_record_by', null=True)
    record_date = models.DateTimeField(auto_now_add=True)
    modified_by = models.ForeignKey(CustomUser, on_delete=models.CASCADE, related_name='%(app_label)s_%(class)s_modified_by', null=True)
    modified_date = models.DateTimeField(auto_now=True)

    class meta:
        ordering = ['-record_date']
    
    def __str__(self):
        return self.asset_id

