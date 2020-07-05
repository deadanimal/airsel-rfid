# -*- coding: utf-8 -*-
from __future__ import unicode_literals
import uuid

from django.contrib.gis.db import models
from django.core.validators import MaxValueValidator, MinValueValidator

from simple_history.models import HistoricalRecords

from assets.models import (
    Asset
)
from users.models import (
    CustomUser
)

from core.helpers import PathAndRename

class Activity(models.Model):

    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    name = models.CharField(max_length=100, default='NA')

    created_by = models.ForeignKey(CustomUser, on_delete=models.CASCADE, null=True, related_name='activity_created_by')
    completed_at = models.DateTimeField(blank=True, null=True)

    created_at = models.DateTimeField(auto_now_add=True)
    modified_at = models.DateTimeField(auto_now=True)

    class meta:
        ordering = ['name']
    
    def __str__(self):
        return self.name


class WorkActivity(models.Model):

    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    name = models.CharField(max_length=100, default='NA')
    
    activity = models.ForeignKey(Activity, on_delete=models.CASCADE, null=True, related_name='work_activity_activity')
    completed_by = models.ForeignKey(CustomUser, on_delete=models.CASCADE, null=True, related_name='work_activity_completed_by')
    completed_at = models.DateTimeField(blank=True, null=True)

    created_at = models.DateTimeField(auto_now_add=True)
    modified_at = models.DateTimeField(auto_now=True)

    class meta:
        ordering = ['name']
    
    def __str__(self):
        return "{} {} {}".format(self.name, self.activity, self.created_at)


class WorkRequest(models.Model):

    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    name = models.CharField(max_length=100, default='NA')
    asset = models.ForeignKey(Asset, on_delete=models.CASCADE, null=True, related_name='work_request_asset')
    description = models.CharField(max_length=255, default='NA')

    ISSUE_TYPE = [
        ('NA', 'Not Available')
    ]
    issue_type = models.CharField(
        max_length=2,
        choices=ISSUE_TYPE,
        default='NA'
    )

    created_at = models.DateTimeField(auto_now_add=True)
    modified_at = models.DateTimeField(auto_now=True)

    class meta:
        ordering = ['name']
    
    def __str__(self):
        return self.name


class OperationalReading(models.Model):

    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    asset = models.ForeignKey(Asset, on_delete=models.CASCADE, null=True, related_name='operational_reading_asset')

    running_hours = models.IntegerField(default=0, blank=True)
    pressure_reading = models.IntegerField(default=0, blank=True)
    flow_rate = models.IntegerField(default=0, blank=True)
    
    created_at = models.DateTimeField(auto_now_add=True)
    modified_at = models.DateTimeField(auto_now=True)

    class meta:
        ordering = ['asset']
    
    def __str__(self):
        return self.asset

