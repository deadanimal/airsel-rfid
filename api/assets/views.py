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
    Asset,AssetRegistration,
    AssetGroup,
    AssetType,
    Rfid
)

from .serializers import (
    AssetSerializer,AssetRegistrationSerializer,
    AssetGroupSerializer,
    AssetTypeSerializer,
    RfidSerializer
)

class AssetViewSet(NestedViewSetMixin, viewsets.ModelViewSet):
    queryset = Asset.objects.all()
    serializer_class = AssetSerializer
    filter_backends = (DjangoFilterBackend, SearchFilter, OrderingFilter)
    filterset_fields = [
        'badge_number',
        'purchased_at',
        'is_active',
        'owning_department',
        'level_1',
        'level_2',
        'level_3',
        'level_4',
        'level_5',
        'level_6',
        'primary_category',
        'identity',
        'sub_category_1',
        'sub_category_2',
        'type_asset',
        'category',
        'acquired_by',
        'brand',
        'model_no',
        'rating',
        'status',
        'measuring_type',
        'is_warranty',
        'po_vendor',
        'location'
    ]

    def get_permissions(self):
        if self.action == 'list':
            permission_classes = [AllowAny]
        else:
            permission_classes = [AllowAny]

        return [permission() for permission in permission_classes]    

    
    def get_queryset(self):
        queryset = Asset.objects.all()

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


    # @action(methods=['GET'], detail=False)
    # def filter_table_testing(self, request, *args, **kwargs):

    #     qqq = request.GET.get('qqq', '')
    #     rrr = request.GET.get('rrr', '')
    #     print('POST = ')
    #     print('qqq = ',qqq)
    #     print('rrr = ',rrr)

    #     result = AssetRegistration.objects.filter(asset_identity__icontains=qqq,parent_location__icontains=rrr)
    #     print('asset_list = ')
    #     serializer = AssetRegistrationSerializer(result, many=True)
    #     return Response(serializer.data)