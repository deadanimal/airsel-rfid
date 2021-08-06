import uuid
from django.db import models

class Dashboard(models.Model):

    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    created_at = models.DateTimeField(auto_now_add=True)

    class meta:
        ordering = ['created_at']

class TAR(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    title = models.CharField(max_length=100, default='NA')
    total = models.CharField(max_length=100, default='NA')
    created_at = models.DateTimeField(auto_now_add=True)

class WA(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    category = models.CharField(max_length=100, default='NA')
    inprogress = models.CharField(max_length=100, default='NA')
    backLog = models.CharField(max_length=100, default='NA')
    new = models.CharField(max_length=100, default='NA')
    created_at = models.DateTimeField(auto_now_add=True)

class ACS(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    asset_today = models.CharField(max_length=100, default='NA')
    asset_last_month = models.CharField(max_length=100, default='NA')
    total_asset_condition_rating = models.CharField(max_length=100, default='NA')
    percentage_asset_condition = models.CharField(max_length=100, default='NA')
    created_at = models.DateTimeField(auto_now_add=True)

class ACS2(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    title = models.CharField(max_length=100, default='NA')
    noasset = models.CharField(max_length=100, default='NA')
    one = models.CharField(max_length=100, default='NA')
    two = models.CharField(max_length=100, default='NA')
    three = models.CharField(max_length=100, default='NA')
    four = models.CharField(max_length=100, default='NA')
    five = models.CharField(max_length=100, default='NA')
    created_at = models.DateTimeField(auto_now_add=True)

class TAM(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    owning_access_group = models.CharField(max_length=100, default='NA')
    type = models.CharField(max_length=100, default='NA')
    total = models.CharField(max_length=100, default='NA')


