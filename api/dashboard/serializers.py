from rest_framework import serializers
from .models import Dashboard, TAR, WA, ACS, ACS2, TAM

class DashboardSerializer(serializers.ModelSerializer):

    class Meta:
        model = Dashboard 
        fields = '__all__'

class TarSerializer(serializers.ModelSerializer):

    class Meta:
        model = TAR 
        fields = '__all__'

class WASerializer(serializers.ModelSerializer):

    class Meta:
        model = WA 
        fields = '__all__'

class ACSSerializer(serializers.ModelSerializer):

    class Meta:
        model = ACS 
        fields = '__all__'

class ACS2Serializer(serializers.ModelSerializer):

    class Meta:
        model = ACS2 
        fields = '__all__'

class TAMSerializer(serializers.ModelSerializer):

    class Meta:
        model = TAM 
        fields = '__all__'
