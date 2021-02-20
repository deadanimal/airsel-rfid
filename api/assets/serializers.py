from datetime import datetime
from calendar import timegm
import json

from django.contrib.auth.forms import PasswordResetForm
from django.conf import settings
from django.utils.translation import gettext as _
from rest_framework import serializers
from django.utils.timezone import now

from .models import (
    Asset,
    AssetRegistration,
    AssetGroup,
    AssetType,
    Rfid,
    AssetBadgeFormat,
    AssetAttribute,
    AssetAttributeColumn,
    AssetLocation,
    AssetMeasurementType,
    AssetLocationSync,
    AssetAttributeField
)

class AssetSerializer(serializers.ModelSerializer):

    class Meta:
        model = Asset
        fields = '__all__'

class AssetBadgeFormatSerializer(serializers.ModelSerializer):

    class Meta:
        model = AssetBadgeFormat
        fields = '__all__'

class AssetRegistrationSerializer(serializers.ModelSerializer):

    class Meta:
        model = AssetRegistration
        fields = '__all__'

class AssetGroupSerializer(serializers.ModelSerializer):

    class Meta:
        model = AssetGroup
        fields = '__all__'

class AssetTypeSerializer(serializers.ModelSerializer):

    class Meta:
        model = AssetType
        fields = '__all__'

class RfidSerializer(serializers.ModelSerializer):

    class Meta:
        model = Rfid
        fields = '__all__'

class AssetAttributeSerializer(serializers.ModelSerializer):

    class Meta:
        model = AssetAttribute
        fields = '__all__'

class AssetAttributeColumnSerializer(serializers.ModelSerializer):

    class Meta:
        model = AssetAttributeColumn
        fields = '__all__'

class AssetLocationSerializer(serializers.ModelSerializer):

    class Meta:
        model = AssetLocation
        fields = '__all__'

class AssetMeasurementTypeSerializer(serializers.ModelSerializer):

    class Meta:
        model = AssetMeasurementType
        fields = '__all__'

class AssetExtendedSerializer(serializers.ModelSerializer):

    measurement_types = AssetMeasurementTypeSerializer(many=True)
    asset_attributes = AssetAttributeSerializer(many=True)
    # submitted_datetime = serializers.DateTimeField(format="%Y-%m-%d %H:%m", input_formats=None)
    # created_date = serializers.DateTimeField(format="%Y-%m-%d %H:%m", input_formats=None)
    # modified_date = serializers.DateTimeField(format="%Y-%m-%d %H:%m", input_formats=None)

    class Meta:
        model = Asset
        fields = '__all__'

class AssetLocationSyncSerializer(serializers.ModelSerializer):

    class Meta:
        model = AssetLocationSync
        fields = '__all__'

class AssetAttributeFieldSerializer(serializers.ModelSerializer):

    class Meta:
        model = AssetAttributeField
        fields = '__all__'
