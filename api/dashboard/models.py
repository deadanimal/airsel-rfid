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
    category = models.CharField(max_length=100, default='NA')
    inprogress = models.CharField(max_length=100, default='NA')
    backLog = models.CharField(max_length=100, default='NA')
    new = models.CharField(max_length=100, default='NA')
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






