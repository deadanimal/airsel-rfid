from datetime import datetime
from calendar import timegm
import json

from django.contrib.auth.forms import PasswordResetForm
from django.conf import settings
from django.utils.translation import gettext as _
from rest_framework import serializers
from django.utils.timezone import now

from .models import (
    Store,
    Region,
    Location
)

class StoreSerializer(serializers.ModelSerializer):

    class Meta:
        model = Store
        fields = '__all__'


class RegionSerializer(serializers.ModelSerializer):

    class Meta:
        model = Region
        fields = '__all__'


class LocationSerializer(serializers.ModelSerializer):

    class Meta:
        model = Location
        fields = '__all__'