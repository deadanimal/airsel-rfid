from django.shortcuts import render
from django.db.models import Q

from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.response import Response
from rest_framework.decorators import action
from rest_framework.filters import SearchFilter, OrderingFilter
from rest_framework import viewsets, status
from rest_framework_extensions.mixins import NestedViewSetMixin

from django_filters.rest_framework import DjangoFilterBackend

from .models import (
    Asset
)

from .serializers import (
    AssetSerializer
)

class AssetViewSet(NestedViewSetMixin, viewsets.ModelViewSet):
    queryset = Asset.objects.all()
    serializer_class = AssetSerializer
    filter_backends = (DjangoFilterBackend, SearchFilter, OrderingFilter)
    filterset_fields = [
        'purchased_at',
        'owned_department',
        'is_active',
        'hierarchy_level_1',
        'hierarchy_level_2',
        'hierarchy_level_3',
        'hierarchy_level_4',
        'hierarchy_level_5',
        'hierarchy_level_6',
        'type_asset',
        'category',
        'category_extra',
        'is_hand_over',
        'is_procured',
        'internal_detail_indentity',
        'primary_category',
        'grouping_sub_category_1',
        'grouping_sub_category_2',
        'brand',
        'model_no',
        'rating',
        'status',
        'measuring_type',
        'is_warranty',
        'po_vendor'
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
    def hand_overed(self, request, *args, **kwargs):
        asset = self.get_object()
        asset.is_hand_over = True
        asset.save()

        serializer = AssetSerializer(asset)
        return Response(serializer.data)


    @action(methods=['GET'], detail=True)
    def dehand_overed(self, request, *args, **kwargs):
        asset = self.get_object()
        asset.is_hand_over = True
        asset.save()

        serializer = AssetSerializer(asset)
        return Response(serializer.data)


    @action(methods=['GET'], detail=True)
    def procured(self, request, *args, **kwargs):
        asset = self.get_object()
        asset.is_procured = True
        asset.save()

        serializer = AssetSerializer(asset)
        return Response(serializer.data)


    @action(methods=['GET'], detail=True)
    def deprocured(self, request, *args, **kwargs):
        asset = self.get_object()
        asset.is_procured = False
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
    
