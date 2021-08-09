from django.shortcuts import render 
from rest_framework.response import Response
from assets.models import Asset
from django.http import JsonResponse
from .models import Dashboard, TAR, ACS, ACS2, WA, TAM
from .serializers import DashboardSerializer, TarSerializer, WASerializer, ACSSerializer, ACS2Serializer, TAMSerializer

from operations.models import WorkOrderActivityCompletion, WorkOrderActivityCompletionAssetLocationAssetList

from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.response import Response
from rest_framework.decorators import action
from rest_framework.filters import SearchFilter, OrderingFilter
from rest_framework import viewsets, status
from rest_framework_extensions.mixins import NestedViewSetMixin
from datetime import datetime, timedelta
import time


owning_access_group = ["CBS","DISTRIBUTION", "ES-D", "FLEET", "LAND", "NRW", "PD-N", "PD-S", "SCADA", "WQ"]
maintenance_group = ["PREVENTIVE MAINTENANCE", "CORRECTIVE MAINTENANCE", "PREDICTIVE MAINTENANCE", "FLEET COMPLIANCE", "INSTALLATION TESTING AND COM", "RETIRE", "UPGRADE"]
rating = [1,2,3,4,5]

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

    @action(methods=['GET', 'POST'], detail=False)
    def analytics_tar(self, request):

        if request.method == "POST":
    
            for oag in owning_access_group:
                temp = {}
                temp["title"] = oag
                temp["total"] = len(Asset.objects.filter(owning_access_group=oag))
             
                serializer = TarSerializer(data=temp)
                valid = serializer.is_valid(raise_exception=True)
                serializer.save()
        res = TAR.objects.all().order_by('-id').values()[0:9]

        return Response(res)

    @action(methods=['GET', 'POST'], detail=False)
    def analytics_wa(self, request):

        if request.method == 'POST':

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

                serializer = WASerializer(data=temp)
                valid = serializer.is_valid(raise_exception=True)
                serializer.save()
       
        res = WA.objects.all().order_by('-id').values()[0:9]
        return Response(res)

    @action(methods=['GET', 'POST'], detail=False)
    def analytics_acs(self, request):

        if request.method == 'POST':

            context = {}
            asset_today = Asset.objects.filter(registered_datetime__date=datetime.now().date())
            context["asset_today"] = len(asset_today)

            asset_last_month = Asset.objects.filter(registered_datetime__month=datetime.now().month - 1)
            context["asset_last_month"] = len(asset_last_month)

            assets = Asset.objects.all()
            total_asset_condition_rating = int(sum(float(i.condition_rating) for i in assets))
            percentage_asset_condition = int(total_asset_condition_rating/len(assets) * 100)
            context["total_asset_condition_rating"] = total_asset_condition_rating
            context["percentage_asset_condition"] = percentage_asset_condition

            #context["asset_condition_score"] = []
            serializer = ACSSerializer(data=context)
            valid = serializer.is_valid(raise_exception=True)
            serializer.save()


            for i in owning_access_group:

                score = {}
                score['title'] = i
                score["noasset"] = len(Asset.objects.filter(owning_access_group = i))
                score["one"] = len(Asset.objects.filter(owning_access_group = i, condition_rating=1))
                score["two"] = len(Asset.objects.filter(owning_access_group = i, condition_rating=2))
                score["three"] = len(Asset.objects.filter(owning_access_group = i, condition_rating=3))
                score["four"] = len(Asset.objects.filter(owning_access_group = i, condition_rating=4))
                score["five"] = len(Asset.objects.filter(owning_access_group = i, condition_rating=5))

                serializer = ACS2Serializer(data=score)
                valid = serializer.is_valid(raise_exception=True)
                serializer.save()

        res = {}

        res['message_1'] = ACS.objects.all().order_by('-id').values()[0:1] 
        res['message_2'] = ACS2.objects.all().order_by('-id').values()[0:9]

        return Response(res)

    @action(methods=['GET', 'POST'], detail=False)
    def analytics_tam(self, request):
        
        # restructure data for chart
        if request.method == 'GET':


            return_view = {}
            total = 0
            for oag in owning_access_group:
                return_view[oag] = []
                data = TAM.objects.filter(owning_access_group=oag)
                for j in data:
                    k = {
                            "type":j.type, 
                            "total":j.total
                    }
                    total += int(j.total)
                    return_view[oag].append(k)
                 
            return_view["totalAssetMaintenance"] = total
            return Response(return_view)



        if request.method == 'POST':

            res = {}
            for oag in owning_access_group:
                res[oag] = {}
                for mtype in maintenance_group:
                    res[oag][mtype] = 0

            waclacl = WorkOrderActivityCompletionAssetLocationAssetList.objects.all()
            asset = []
            for i in waclacl:
                asset.append(i.asset_id)

            for j in asset:
                k = Asset.objects.filter(asset_id=j)
                if len(k) > 0:
                    for l in k:
                        waclacl = WorkOrderActivityCompletionAssetLocationAssetList.objects.filter(asset_id=l)
                        if len(waclacl) > 0:
                            wacl = WorkOrderActivityCompletion.objects.get(asset_location_asset_list=waclacl[0].id)
                            res[l.owning_access_group][wacl.field_1] += len(wacl.asset_location_asset_list.all())
            
            # restructure before save
            temp2 = []
            temp = {}
            TAM.objects.all().delete()
            for oag in owning_access_group:
                temp["owning_access_group"] = oag
                for mtype in maintenance_group:
                    temp["type"] = mtype 
                    temp["total"] = res[oag][mtype]
                    
                    serializer = TAMSerializer(data=temp)
                    valid = serializer.is_valid(raise_exception=True)
                    serializer.save()

            res = TAM.objects.all().values()

                                 
        print(res)
        return Response(res)


