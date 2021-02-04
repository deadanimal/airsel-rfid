
import json

from django.shortcuts import render
from django.db.models import Q

from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.response import Response
from rest_framework.decorators import action
from rest_framework.filters import SearchFilter, OrderingFilter
from rest_framework import viewsets, status
from rest_framework_extensions.mixins import NestedViewSetMixin

from django_filters.rest_framework import DjangoFilterBackend

from datetime import datetime

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
    AssetMeasurementType
)

from .serializers import (
    AssetSerializer,
    AssetRegistrationSerializer,
    AssetGroupSerializer,
    AssetTypeSerializer,
    RfidSerializer,
    AssetBadgeFormatSerializer,
    AssetAttributeSerializer,
    AssetAttributeColumnSerializer,
    AssetLocationSerializer,
    AssetMeasurementTypeSerializer,
    AssetExtendedSerializer
    )

class AssetViewSet(NestedViewSetMixin, viewsets.ModelViewSet):
    queryset = Asset.objects.all()
    serializer_class = AssetSerializer
    filter_backends = (DjangoFilterBackend, SearchFilter, OrderingFilter)
    filterset_fields = []

    def get_permissions(self):
        if self.action == 'list':
            permission_classes = [AllowAny]
        else:
            permission_classes = [AllowAny]

        return [permission() for permission in permission_classes]    

    def get_queryset(self):
        queryset = Asset.objects.all()

        # FROM APPLICATION/JSON THROUGH API
        if bool(self.request.data):
            print("enter bool()")
            if 'from_date' in self.request.data and 'to_date' in self.request.data and 'transaction_type' in self.request.data:

                from_date = self.request.data.get('from_date', None)
                to_date = self.request.data.get('to_date', None)
                transaction_type_req = self.request.data.get(
                    'transaction_type', None)

                if from_date is not None and to_date is not None and transaction_type_req is not None:
                    print(Asset.objects.filter(submitted_datetime__range=(
                        from_date, to_date), transaction_type=(transaction_type_req)).query)
                    queryset = Asset.objects.filter(submitted_datetime__range=(
                        from_date, to_date), transaction_type=(transaction_type_req))

        return queryset

    @action(methods=['POST'], detail=False)
    def extended_all(self, request, *args, **kwargs):
        from_date = self.request.data['from_date']
        to_date = self.request.data['to_date']
        transaction_type = self.request.data['transaction_type']

        # Note
        # If transaction_type = ADD, filter by registered_datetime
        # If transaction_type = UPDATE, filter by submitted_datetime

        if from_date is not None and to_date is not None and transaction_type is not None:
            if transaction_type == 'ADD':
                queryset = Asset.objects.filter(registered_datetime__range=(
                    from_date, to_date)).filter(transaction_type=transaction_type)
            elif transaction_type == 'UPDATE':
                queryset = Asset.objects.filter(submitted_datetime__range=(
                    from_date, to_date)).filter(transaction_type=transaction_type)

        serializer = AssetExtendedSerializer(queryset, many=True)
        return Response(serializer.data)

    @action(methods=['GET'], detail=True)
    def extended(self, request, *args, **kwargs):
        asset_ = self.get_object()

        serializer = AssetExtendedSerializer(asset_)
        return Response(serializer.data)

    @action(methods=['GET'], detail=True)
    def activate(self, request, *args, **kwargs):
        asset = self.get_object()
        asset.is_active = True
        asset.save()

        serializer = AssetSerializer(asset)
        return Response(serializer.data)

    
    @action(methods=['GET'], detail=True)
    def deactivate(self, request, *args, **kwargs):
        asset = self.get_object()
        asset.is_active = False
        asset.save()

        serializer = AssetSerializer(asset)
        return Response(serializer.data)


    @action(methods=['GET'], detail=True)
    def warranty_end(self, request, *args, **kwargs):
        asset = self.get_object()
        asset.is_warranty = False
        asset.save()

        serializer = AssetSerializer(asset)
        return Response(serializer.data)
    
    @action(methods=['GET'], detail=True)
    def approve(self, request, *args, **kwargs):
        asset = self.get_object()
        asset.approval_status = 'AP'
        asset.approval_by = self.request.user
        asset.approval_at = datetime.now()
        asset.save()

        serializer = AssetSerializer(asset)
        return Response(serializer.data)

    @action(methods=['GET'], detail=True)
    def reject(self, request, *args, **kwargs):
        asset = self.get_object()
        asset.approval_status = 'RJ'
        asset.approval_by = self.request.user
        asset.approval_at = datetime.now()
        asset.save()

        serializer = AssetSerializer(asset)
        return Response(serializer.data)

class AssetGroupViewSet(NestedViewSetMixin, viewsets.ModelViewSet):
    queryset = AssetGroup.objects.all()
    serializer_class = AssetGroupSerializer
    filter_backends = (DjangoFilterBackend, SearchFilter, OrderingFilter)
    filterset_fields = [
        'category',
        'created_at'
    ]

    def get_permissions(self):
        if self.action == 'list':
            permission_classes = [AllowAny]
        else:
            permission_classes = [AllowAny]

        return [permission() for permission in permission_classes]    

    
    def get_queryset(self):
        queryset = AssetGroup.objects.all()

        """
        if self.request.user.is_anonymous:
            queryset = Asset.objects.none()

        else:
            user = self.request.user
            company_employee = CompanyEmployee.objects.filter(employee=user)
            company = company_employee[0].company
            
            if company.company_type == 'AD':
                queryset = Asset.objects.all()
            else:
                queryset = Asset.objects.filter(company=company.id)
        """
        return queryset

class AssetTypeViewSet(NestedViewSetMixin, viewsets.ModelViewSet):
    queryset = AssetType.objects.all()
    serializer_class = AssetTypeSerializer
    filter_backends = (DjangoFilterBackend, SearchFilter, OrderingFilter)
    filterset_fields = [
        'category',
        'created_at'
    ]

    def get_permissions(self):
        if self.action == 'list':
            permission_classes = [AllowAny]
        else:
            permission_classes = [AllowAny]

        return [permission() for permission in permission_classes]    

    
    def get_queryset(self):
        queryset = AssetType.objects.all()

        """
        if self.request.user.is_anonymous:
            queryset = Asset.objects.none()

        else:
            user = self.request.user
            company_employee = CompanyEmployee.objects.filter(employee=user)
            company = company_employee[0].company
            
            if company.company_type == 'AD':
                queryset = Asset.objects.all()
            else:
                queryset = Asset.objects.filter(company=company.id)
        """
        return queryset

class RfidViewSet(NestedViewSetMixin, viewsets.ModelViewSet):
    queryset = Rfid.objects.all()
    serializer_class = RfidSerializer
    filter_backends = (DjangoFilterBackend, SearchFilter, OrderingFilter)
    filterset_fields = [
        'created_at'
    ]

    def get_permissions(self):
        if self.action == 'list':
            permission_classes = [AllowAny]
        else:
            permission_classes = [AllowAny]

        return [permission() for permission in permission_classes]    

    
    def get_queryset(self):
        queryset = Rfid.objects.all()

        """
        if self.request.user.is_anonymous:
            queryset = Asset.objects.none()

        else:
            user = self.request.user
            company_employee = CompanyEmployee.objects.filter(employee=user)
            company = company_employee[0].company
            
            if company.company_type == 'AD':
                queryset = Asset.objects.all()
            else:
                queryset = Asset.objects.filter(company=company.id)
        """
        return queryset

class AssetRegistrationViewSet(NestedViewSetMixin, viewsets.ModelViewSet):
    queryset = AssetRegistration.objects.all()
    serializer_class = AssetRegistrationSerializer
    filter_backends = (DjangoFilterBackend, SearchFilter, OrderingFilter)
    filterset_fields = [
        'asset_id',
        'badge_no',
        'node_id',
        'hex_code',
        'created_at'
    ]

    def get_permissions(self):
        if self.action == 'list':
            permission_classes = [AllowAny]
        else:
            permission_classes = [AllowAny]

        return [permission() for permission in permission_classes]    

    
    def get_queryset(self):
        queryset = AssetRegistration.objects.all()

        """
        if self.request.user.is_anonymous:
            queryset = Asset.objects.none()

        else:
            user = self.request.user
            company_employee = CompanyEmployee.objects.filter(employee=user)
            company = company_employee[0].company
            
            if company.company_type == 'AD':
                queryset = Asset.objects.all()
            else:
                queryset = Asset.objects.filter(company=company.id)
        """
        return queryset


    @action(methods=['GET'], detail=False)
    def new_register_list(self, request, *args, **kwargs):

        asset_list = AssetRegistration.objects.filter(Q(status='CO') | Q(status='IC'))

        serializer = AssetRegistrationSerializer(asset_list, many=True)
        return Response(serializer.data)

    @action(methods=['GET'], detail=False)
    def processed_list(self, request, *args, **kwargs):

        asset_list = AssetRegistration.objects.filter(status='PR')

        serializer = AssetRegistrationSerializer(asset_list, many=True)
        return Response(serializer.data)

    @action(methods=['GET'], detail=False)
    def new_processed_list(self, request, *args, **kwargs):

        asset_list = AssetRegistration.objects.filter(status='NP')

        serializer = AssetRegistrationSerializer(asset_list, many=True)
        return Response(serializer.data)

    @action(methods=['GET'], detail=False)
    def approved_list(self, request, *args, **kwargs):

        asset_list = AssetRegistration.objects.filter(status='AP')

        serializer = AssetRegistrationSerializer(asset_list, many=True)
        return Response(serializer.data)

    @action(methods=['GET'], detail=False)
    def rejected_list(self, request, *args, **kwargs):

        rejected_list_asset_list = AssetRegistration.objects.filter(status='RJ')
        print('asset_list = ')
        print(rejected_list_asset_list)
        rejected_list_serializer = AssetRegistrationSerializer(rejected_list_asset_list, many=True)
        return Response(rejected_list_serializer.data)


    @action(methods=['GET'], detail=False)
    def Remove_all_record(self, request, *args, **kwargs):

        AssetRegistration.objects.all().delete()

        print('asset_list = ')
        # print(rejected_list_asset_list)
        # rejected_list_serializer = AssetRegistrationSerializer(rejected_list_asset_list, many=True)
        # return Response(rejected_list_serializer.data)
    
    @action(methods=['POST'], detail=True)
    def patch_asset(self, request, *args, **kwargs):
        asset_request_ = json.loads(request.body)
        asset_hex_code_ = asset_request_['hex_code']
        asset_badge_no_ = asset_request_['badge_no']

        asset_ = AssetRegistration.objects.filter(
            badge_no=asset_badge_no_
        ).first()

        asset_.hex_code = asset_hex_code_
        asset_.save()

        print('asset = ')
        print(asset_)

        serializer = AssetRegistrationSerializer(asset_)
        return Response(serializer.data)  
        # rejected_list_serializer = AssetRegistrationSerializer(rejected_list_asset_list, many=True)
        # return Response(rejected_list_serializer.data) 

class AssetBadgeFormatViewSet(NestedViewSetMixin, viewsets.ModelViewSet):
    queryset = AssetBadgeFormat.objects.all()
    serializer_class = AssetBadgeFormatSerializer
    filter_backends = (DjangoFilterBackend, SearchFilter, OrderingFilter)
    filterset_fields = [
        'asset_primary_category',
        'status'
    ]

    def get_permissions(self):
        if self.action == 'list':
            permission_classes = [AllowAny]
        else:
            permission_classes = [AllowAny]

        return [permission() for permission in permission_classes]    

    
    def get_queryset(self):
        queryset = AssetBadgeFormat.objects.all()

        """
        if self.request.user.is_anonymous:
            queryset = Asset.objects.none()

        else:
            user = self.request.user
            company_employee = CompanyEmployee.objects.filter(employee=user)
            company = company_employee[0].company
            
            if company.company_type == 'AD':
                queryset = Asset.objects.all()
            else:
                queryset = Asset.objects.filter(company=company.id)
        """
        return queryset

class AssetAttributeViewSet(NestedViewSetMixin, viewsets.ModelViewSet):
    queryset = AssetAttribute.objects.all()
    serializer_class = AssetAttributeSerializer
    filter_backends = (DjangoFilterBackend, SearchFilter, OrderingFilter)

    def get_permissions(self):
        if self.action == 'list':
            permission_classes = [AllowAny]
        else:
            permission_classes = [AllowAny]

        return [permission() for permission in permission_classes]    

    
    def get_queryset(self):
        queryset = AssetAttribute.objects.all()

        """
        if self.request.user.is_anonymous:
            queryset = Asset.objects.none()

        else:
            user = self.request.user
            company_employee = CompanyEmployee.objects.filter(employee=user)
            company = company_employee[0].company
            
            if company.company_type == 'AD':
                queryset = Asset.objects.all()
            else:
                queryset = Asset.objects.filter(company=company.id)
        """
        return queryset

class AssetAttributeColumnViewSet(NestedViewSetMixin, viewsets.ModelViewSet):
    queryset = AssetAttributeColumn.objects.all()
    serializer_class = AssetAttributeColumnSerializer
    filter_backends = (DjangoFilterBackend, SearchFilter, OrderingFilter)
    filterset_fields = [
        'asset_type_id'
    ]

    def get_permissions(self):
        if self.action == 'list':
            permission_classes = [AllowAny]
        else:
            permission_classes = [AllowAny]

        return [permission() for permission in permission_classes]    

    
    def get_queryset(self):
        queryset = AssetAttributeColumn.objects.all()

        """
        if self.request.user.is_anonymous:
            queryset = Asset.objects.none()

        else:
            user = self.request.user
            company_employee = CompanyEmployee.objects.filter(employee=user)
            company = company_employee[0].company
            
            if company.company_type == 'AD':
                queryset = Asset.objects.all()
            else:
                queryset = Asset.objects.filter(company=company.id)
        """
        return queryset

class AssetLocationViewSet(NestedViewSetMixin, viewsets.ModelViewSet):
    queryset = AssetLocation.objects.all()
    serializer_class = AssetLocationSerializer
    filter_backends = (DjangoFilterBackend, SearchFilter, OrderingFilter)
    # filterset_fields = [
    #     'category',
    #     'created_at'
    # ]

    def get_permissions(self):
        if self.action == 'list':
            permission_classes = [AllowAny]
        else:
            permission_classes = [AllowAny]

        return [permission() for permission in permission_classes]    

    
    def get_queryset(self):
        queryset = AssetLocation.objects.all()

        # FROM APPLICATION/JSON THROUGH API
        if bool(self.request.data):
            print("enter bool()")
            if 'from_date' in self.request.data and 'to_date' in self.request.data:

                from_date = self.request.data.get('from_date', None)
                to_date = self.request.data.get('to_date', None)

                if from_date is not None and to_date is not None:
                    # print(AssetLocation.objects.filter(submitted_datetime__range=(from_date,to_date)).query)
                    queryset = AssetLocation.objects.filter(
                        submitted_datetime__range=(from_date, to_date))

        return queryset

    @action(methods=['POST'], detail=False)
    def extended_all(self, request, *args, **kwargs):

        from_date = self.request.data['from_date']
        to_date = self.request.data['to_date']

        if from_date is not None and to_date is not None:
            queryset = AssetLocation.objects.filter(
                submitted_datetime__range=(from_date, to_date))

        serializer = AssetLocationSerializer(queryset, many=True)
        return Response(serializer.data)

class AssetMeasurementTypeViewSet(NestedViewSetMixin, viewsets.ModelViewSet):
    queryset = AssetMeasurementType.objects.all()
    serializer_class = AssetMeasurementTypeSerializer
    filter_backends = (DjangoFilterBackend, SearchFilter, OrderingFilter)

    def get_permissions(self):
        if self.action == 'list':
            permission_classes = [AllowAny]
        else:
            permission_classes = [AllowAny]

        return [permission() for permission in permission_classes]

    def get_queryset(self):
        queryset = AssetMeasurementType.objects.all()

        """
        if self.request.user.is_anonymous:
            queryset = Company.objects.none()

        else:
            user = self.request.user
            company_employee = CompanyEmployee.objects.filter(employee=user)
            company = company_employee[0].company

            if company.company_type == 'AD':
                queryset = AssetMeasurementType.objects.all()
            else:
                queryset = AssetMeasurementType.objects.filter(company=company.id)
        """
        return queryset
