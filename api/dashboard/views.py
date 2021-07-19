from django.shortcuts import render
from rest_framework.response import Response
from assets.models import Asset
from django.http import JsonResponse
from .models import Dashboard
from .serializers import DashboardSerializer

from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.response import Response
from rest_framework.decorators import action
from rest_framework.filters import SearchFilter, OrderingFilter
from rest_framework import viewsets, status
from rest_framework_extensions.mixins import NestedViewSetMixin



class DashboardViewSet(NestedViewSetMixin, viewsets.ModelViewSet):
    queryset = Dashboard.objects.all()
    serializer_class = DashboardSerializer 
    def get_permissions(self):
        if self.action == 'list':
            permission_classes = [AllowAny]
        else:
            permission_classes = [AllowAny]

        return [permission() for permission in permission_classes]    

    def get_queryset(self):
        queryset = Dashboard.objects.all()
        return queryset

    @action(methods=['GET'], detail=False)
    def analytics_tar(self, request):
    
        temp = {}
    
        owning_access_group = ["CBS","DISTRIBUTION", "ES-D", "FLEET", "LAND", "NRW", "PD-N", "PD-S", "SCADA", "WQ"]
        for oag in owning_access_group:
            temp[oag] = len(Asset.objects.filter(owning_access_group=oag))
        
        return Response(temp)


#def analytics_tar_filtered_by_datetime(self, request, *args, **kwargs):
#    temp = {
#
#    }
#
#    assest = Asset.objects.all()

