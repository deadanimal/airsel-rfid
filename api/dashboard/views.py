from django.shortcuts import render
from rest_framework.response import Response
from assets.models import Asset
from django.http import JsonResponse
from .models import Dashboard
from .serializers import DashboardSerializer

from operations.models import WorkOrderActivityCompletion, WorkOrderActivityCompletionAssetLocationAssetList

from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.response import Response
from rest_framework.decorators import action
from rest_framework.filters import SearchFilter, OrderingFilter
from rest_framework import viewsets, status
from rest_framework_extensions.mixins import NestedViewSetMixin
import time




owning_access_group = ["CBS","DISTRIBUTION", "ES-D", "FLEET", "LAND", "NRW", "PD-N", "PD-S", "SCADA", "WQ"]
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
        start = int(time.time())
    
        res = [] 
        for oag in owning_access_group:
            temp = {}
            temp["title"] = oag
            temp["total"] = len(Asset.objects.filter(owning_access_group=oag))
            res.append(temp)

        print(int(time.time()) - start)
        return Response(res)

    @action(methods=['GET'], detail=False)
    def analytics_tam(self, request):
        start = int(time.time())

    
        res = [] 
        assets_id = []
        assets = []

        #woacl = [i.asset_location_asset_list[0] for i in WorkOrderActivityCompletion.objects.all()]
        woacl = []
        data = WorkOrderActivityCompletion.objects.all()
        for i in data:
            print(i.__dict__)
        
        for i in woacl:
            assets_id.append(WorkOrderActivityCompletionAssetLocationAssetList.objects.filter(id=i)[0].asset_id)

        for i in assets_id:
            assets.append(Asset.objects.filter(id=i)[0])

        for oag in owning_access_group:
            temp = {}
            temp["title"] = oag

            for i in assets:
                if i.title == oag:
                    temp["total"] += 1

            res.append(temp)
        

        print("time taken", int(time.time()) - start)
        
        return Response(res)

    @action(methods=['GET'], detail=False)
    def analytics_asc(self, request):
    
        res = [] 
        owning_access_group = ["CBS","DISTRIBUTION", "ES-D", "FLEET", "LAND", "NRW", "PD-N", "PD-S", "SCADA", "WQ"]
        for oag in owning_access_group:
            temp = {}
            temp["title"] = oag
            temp["total"] = len(Asset.objects.filter(owning_access_group=oag))
            res.append(temp)
        
        return Response(res)

    @action(methods=['GET'], detail=False)
    def analytics_wa(self, request):
        res = []
        return Response(res)








#def analytics_tar_filtered_by_datetime(self, request, *args, **kwargs):
#    temp = {
#
#    }
#
#    assest = Asset.objects.all()

