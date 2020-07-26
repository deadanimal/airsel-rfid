# -*- coding: utf-8 -*-
from __future__ import unicode_literals
import uuid

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
    wams_work_id = models.CharField(max_length=100, default='NA')
    work_order = models.ForeignKey(WorkOrder, on_delete=models.CASCADE, null=True, related_name='work_order_no')
    completed_at = models.DateTimeField(blank=True, null=True)

    maintenance_form = models.ForeignKey(Maintenance, on_delete=models.CASCADE, null=True, related_name='work_activity_maintenance_form')
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
        ('PI', 'PUMP-INSPECTION')
        ('MI', 'MOTOR-INSPECTION')
        ('SP', 'STARTER-PANEL-INSPECTION')
    ]
    activity_type = models.CharField(max_length=2, choices=ACTIVITY_TYPE, default='IT')
    activity_description = models.CharField(max_length=100, default='NA')

    STATUS = [
        ('BL', 'Backlog'),
        ('IP', 'In Progress'),
        ('NW', 'New')
        ('CP', 'Completed')
    ]
    status = models.CharField(max_length=2, choices=STATUS, default='NW')
    due_date = models.DateTimeField(blank=True, null=True)

    created_at = models.DateTimeField(auto_now_add=True)
    modified_at = models.DateTimeField(auto_now=True)

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


class WorkRequest(models.Model):

    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    name = models.CharField(max_length=100, default='NA')
    description = models.CharField(max_length=255, default='NA')
    asset = models.ForeignKey(
        Asset,
        on_delete=models.CASCADE,
        null=True,
        related_name='work_request_asset'
    )
    issue_type = models.ForeignKey(
        IssueType,
        on_delete=models.CASCADE,
        null=True,
        related_name='work_request_issue_type'
    )
    image = models.ForeignKey(
        Media,
        on_delete=models.CASCADE,
        null=True,
        related_name='work_request_image'
    )

    created_at = models.DateTimeField(auto_now_add=True)
    modified_at = models.DateTimeField(auto_now=True)

    class meta:
        ordering = ['name']
    
    def __str__(self):
        return self.name


class OperationalReading(models.Model):

    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    asset = models.ForeignKey(
        Asset,
        on_delete=models.CASCADE,
        null=True,
        related_name='operational_reading_asset'
    )

    running_hours = models.FloatField(default=0, blank=True)
    pressure_reading = models.FloatField(default=0, blank=True)
    flow_rate = models.FloatField(default=0, blank=True)
    
    created_at = models.DateTimeField(auto_now_add=True)
    modified_at = models.DateTimeField(auto_now=True)

    class meta:
        ordering = ['asset']
    
    def __str__(self):
        return self.asset

