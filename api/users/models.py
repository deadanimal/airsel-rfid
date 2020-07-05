from __future__ import unicode_literals
import json
import uuid

from django.contrib.auth.models import AbstractUser
from django.db import models

from django.contrib.postgres.fields import ArrayField
from phonenumber_field.modelfields import PhoneNumberField
from simple_history.models import HistoricalRecords

from core.helpers import PathAndRename

class CustomUser(AbstractUser):

    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    name = models.CharField(max_length=255, blank=True)
    office_number = PhoneNumberField(blank=True)
    mobile_number = PhoneNumberField(blank=True)
    nric = models.CharField(max_length=12, default='NA')

    USER_TYPE = [
        ('OP', 'Operator'),
        ('SK', 'Store Keeper'),
        ('SS', 'Store Supervisor'),
        ('TC', 'Technical Crew')
    ]
    user_type = models.CharField(
        max_length=2,
        choices=USER_TYPE,
        default='TC'
    )

    profile_picture = models.ImageField(null=True, upload_to=PathAndRename('images')) 

    class Meta:
        ordering = ['name']

    def __str__(self):
        return self.name

