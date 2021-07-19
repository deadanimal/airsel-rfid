import uuid
from django.db import models

class Dashboard(models.Model):

    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    created_at = models.DateTimeField(auto_now_add=True)

    class meta:
        ordering = ['created_at']

