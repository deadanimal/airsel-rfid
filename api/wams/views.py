from django.http import JsonResponse
from django.shortcuts import render
from django.db.models import Q
from django.core.files.storage import default_storage
from django.utils.timezone import make_aware

from django.template.loader import render_to_string
from django.core.files.storage import FileSystemStorage
from django.http import HttpResponse
from django.core.files.base import ContentFile
from django.conf import settings

# import datetime
import json
import uuid
import pytz
import base64

from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.response import Response
from rest_framework.decorators import action
from rest_framework.filters import SearchFilter, OrderingFilter
from rest_framework import viewsets, status
from rest_framework_extensions.mixins import NestedViewSetMixin

from django_filters.rest_framework import DjangoFilterBackend

from datetime import datetime

from wams.services.int01_employee import get_employee
from wams.services.int02_workorderactivity import get_workorderactivity
from wams.services.int04_assetsyncoutbound import get_assetsyncoutbound

from .models import (
    Wams
)

from .serializers import (
    WamsSerializer
)

class WamsViewSet(NestedViewSetMixin, viewsets.ModelViewSet):

    queryset = Wams.objects.all()
    serializer_class = WamsSerializer
    filter_backends = (DjangoFilterBackend, SearchFilter, OrderingFilter)

    def get_permissions(self):
        if self.action == 'list':
            permission_classes = [AllowAny]
        else:
            permission_classes = [AllowAny]

        return [permission() for permission in permission_classes]    

    
    def get_queryset(self):
        print('Version baru')
        queryset = Wams.objects.all()
        return queryset

    @action(methods=['POST'], detail=False)
    def services(self, request, *args, **kwargs):

        call_json = json.loads(request.body)
        request_service_name = call_json['service_name']
        print('herehehheheh')
        print('Version baru')

        # print(call_json)

        url_employee = 'https://pasb-dev-uwa-iws.oracleindustry.com:443/ouaf/webservices/CM-EMPLOYEE'
        url_work_order_activity = 'https://pasb-dev-uwa-iws.oracleindustry.com:443/ouaf/webservices/CM-WORKORDERACTIVITY'
        url_asset_sync_outbound = 'https://pasb-dev-uwa-iws.oracleindustry.com:443/ouaf/webservices/CM-ASSETSYNCOUTBOUND'

        # to convert username:password into base64 ascii
        auth = "RFID_INTEGRATION:Rfid_1nt"
        auth_bytes = auth.encode('ascii')
        base64_bytes = base64.b64encode(auth_bytes)
        base64_auth = base64_bytes.decode('ascii')

        headers = {
            'content-type': 'text/xml;charset=UTF-8',
            'authorization': 'Basic ' + base64_auth
        }

        print('header', headers)
        # print('')

        # print(call_json)

        if request_service_name == 'getEmployee':
            middleware_call = get_employee(url_employee, headers, '', '')
            print(middleware_call)
            json_response = {
                'result': { k.replace('ouaf:', ''): v for k, v in middleware_call.items() }
            }

        elif request_service_name == 'getWorkOrderActivity':
            middleware_call = get_workorderactivity(url_work_order_activity, headers, '', '')
            
            middleware_list = []
            for item in middleware_call:
                new_json = {}
                for key in item:
                    new_key = key.replace('ouaf:', '')
                    new_json[new_key] = item[key]
                middleware_list.append(new_json)
            
            json_response = {
                'result': middleware_list#middleware_call
            }

        elif request_service_name == 'getAssetSyncOutbound':
            middleware_call = get_assetsyncoutbound(url_asset_sync_outbound, headers, '', '')
            # print(middleware_call)
            middleware_list = []
            for item in middleware_call:
                new_json = {}
                for key in item:
                    new_key = key.replace('ouaf:', '')
                    new_json[new_key] = item[key]
                middleware_list.append(new_json)
            
            json_response = {
                'result': middleware_list#middleware_call
            }
            # print(json.dump(json_response))

        return JsonResponse(json_response)
        
        
        
        
