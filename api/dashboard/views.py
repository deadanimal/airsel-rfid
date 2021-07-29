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
    def analytics_wa(self, request):
        start = int(time.time())

        res = [] 
        assets_id = []
        assets = []

        woacl = []
        temp2 = WorkOrderActivityCompletionAssetLocationAssetList.objects.all()
        asset = []
        for i in temp2:
            asset.append(i.asset_id)
 

        for oag in owning_access_group:
            temp = {}
            temp["category"] = oag
            temp["inprogress"] = 0
            temp["backLog"] = 0
            temp["new"] = 0

                   
            for k in asset:
                c = Asset.objects.filter(asset_id=k)
                if len(c) > 0:
                    for i in c:
                        if i.owning_access_group == oag:
                            # from asset -> woaclacl -> woacl
                            waclacl = WorkOrderActivityCompletionAssetLocationAssetList.objects.filter(asset_id=i)
                            if len(waclacl) > 0:
                                wacl = WorkOrderActivityCompletion.objects.get(asset_location_asset_list=waclacl[0].id)
                                if wacl.status == "InProgress":
                                    temp["inprogress"]+=1
                                if wacl.status == "BackLog":
                                    temp["backLog"]+=1
                                if wacl.status == "New":
                                    temp["new"]+=1
                    
                    

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
    def analytics_tam(self, request):
        res = []
        return Response(res)








#def analytics_tar_filtered_by_datetime(self, request, *args, **kwargs):
#    temp = {
#
#    }
#
#    assest = Asset.objects.all()

