from datetime import datetime
from calendar import timegm
import json

from django.contrib.auth.forms import PasswordResetForm
from django.conf import settings
from django.utils.translation import gettext as _
from rest_framework import serializers
from django.utils.timezone import now

from .models import (
    Maintenance,
    IssueType,
    WorkActivity,
    WorkActivityTeam,
    WorkRequest,
    OperationalReading
)

class MaintenanceSerializer(serializers.ModelSerializer):

    class Meta:
        model = Maintenance
        fields = '__all__'


class IssueTypeSerializer(serializers.ModelSerializer):

    class Meta:
        model = IssueType
        fields = '__all__'


class WorkActivitySerializer(serializers.ModelSerializer):

    class Meta:
        model = WorkActivity
        fields = '__all__'


class WorkActivityTeamSerializer(serializers.ModelSerializer):

    class Meta:
        model = WorkActivityTeam
        fields = '__all__'


class WorkRequestSerializer(serializers.ModelSerializer):

    class Meta:
        model = WorkRequest
        fields = '__all__'


class OperationalReadingSerializer(serializers.ModelSerializer):

    class Meta:
        model = OperationalReading
        fields = '__all__'