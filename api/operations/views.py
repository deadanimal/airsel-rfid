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
    OwningOrganization,
    Bo,
    Maintenance,
    IssueType,
    WorkOrder,
    WorkActivity,
    WorkActivityTeam,
    WorkClass,
    WorkCategory,
    WorkRequest,
    WorkRequestStatus,
    MeasurementType,
    OperationalReading
)

from .serializers import (
    OwningOrganizationSerializer,
    OwningOrganizationExtendedSerializer,
    BoSerializer,
    BoExtendedSerializer,
    MaintenanceSerializer,
    IssueTypeSerializer,
    WorkOrderSerializer,
    WorkActivitySerializer,
    WorkActivityExtendedSerializer,
    WorkActivityTeamSerializer,
    WorkClassSerializer,
    WorkClassExtendedSerializer,
    WorkCategorySerializer,
    WorkCategoryExtendedSerializer,
    WorkRequestSerializer,
    WorkRequestExtendedSerializer,
    WorkRequestStatusSerializer,
    WorkRequestStatusExtendedSerializer,
    MeasurementTypeSerializer,
    MeasurementTypeExtendedSerializer,
    OperationalReadingSerializer,
    OperationalReadingExtendedSerializer
)

class OwningOrganizationViewSet(NestedViewSetMixin, viewsets.ModelViewSet):
    queryset = OwningOrganization.objects.all()
    serializer_class = OwningOrganizationSerializer
    filter_backends = (DjangoFilterBackend, SearchFilter, OrderingFilter)
    filterset_fields = [
        'name', 'description', 'detail_description', 'record_by', 'modified_by'
    ]

    def get_permissions(self):
        if self.action == 'list':
            permission_classes = [AllowAny]
        else:
            permission_classes = [AllowAny]

        return [permission() for permission in permission_classes]    

    
    def get_queryset(self):
        queryset = OwningOrganization.objects.all()
        return queryset

    @action(methods=['GET'], detail=False)
    def extended(self, request, *args, **kwargs):
        
        queryset = OwningOrganization.objects.all()
        serializer_class = OwningOrganizationExtendedSerializer(queryset, many=True)
        
        return Response(serializer_class.data)


class BoViewSet(NestedViewSetMixin, viewsets.ModelViewSet):
    queryset = Bo.objects.all()
    serializer_class = BoSerializer
    filter_backends = (DjangoFilterBackend, SearchFilter, OrderingFilter)
    filterset_fields = [
        'name', 'description', 'status', 'record_by', 'modified_by'
    ]

    def get_permissions(self):
        if self.action == 'list':
            permission_classes = [AllowAny]
        else:
            permission_classes = [AllowAny]

        return [permission() for permission in permission_classes]    

    
    def get_queryset(self):
        queryset = Bo.objects.all()
        return queryset

    @action(methods=['GET'], detail=False)
    def extended(self, request, *args, **kwargs):
        
        queryset = Bo.objects.all()
        serializer_class = BoExtendedSerializer(queryset, many=True)
        
        return Response(serializer_class.data)


class MaintenanceViewSet(NestedViewSetMixin, viewsets.ModelViewSet):
    queryset = Maintenance.objects.all()
    serializer_class = MaintenanceSerializer
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
        queryset = Maintenance.objects.all()

        """
        if self.request.user.is_anonymous:
            queryset = Activity.objects.none()

        else:
            user = self.request.user
            company_employee = CompanyEmployee.objects.filter(employee=user)
            company = company_employee[0].company
            
            if company.company_type == 'AD':
                queryset = Activity.objects.all()
            else:
                queryset = Activity.objects.filter(company=company.id)
        """
        return queryset    
 

class IssueTypeViewSet(NestedViewSetMixin, viewsets.ModelViewSet):
    queryset = IssueType.objects.all()
    serializer_class = IssueTypeSerializer
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
        queryset = IssueType.objects.all()

        """
        if self.request.user.is_anonymous:
            queryset = Activity.objects.none()

        else:
            user = self.request.user
            company_employee = CompanyEmployee.objects.filter(employee=user)
            company = company_employee[0].company
            
            if company.company_type == 'AD':
                queryset = Activity.objects.all()
            else:
                queryset = Activity.objects.filter(company=company.id)
        """
        return queryset    

class WorkOrderViewSet(NestedViewSetMixin, viewsets.ModelViewSet):
    queryset = WorkOrder.objects.all()
    serializer_class = WorkOrderSerializer
    filter_backends = (DjangoFilterBackend, SearchFilter, OrderingFilter)
    filterset_fields = [
        'completed_at',
        'planner_name',
        'wams_id',
    ]

    def get_permissions(self):
        if self.action == 'list':
            permission_classes = [AllowAny]
        else:
            permission_classes = [AllowAny]

        return [permission() for permission in permission_classes]    

    
    def get_queryset(self):
        queryset = WorkOrder.objects.all()

        """
        if self.request.user.is_anonymous:
            queryset = Company.objects.none()

        else:
            user = self.request.user
            company_employee = CompanyEmployee.objects.filter(employee=user)
            company = company_employee[0].company
            
            if company.company_type == 'AD':
                queryset = Activity.objects.all()
            else:
                queryset = Activity.objects.filter(company=company.id)
        """
        return queryset 

class WorkActivityViewSet(NestedViewSetMixin, viewsets.ModelViewSet):
    queryset = WorkActivity.objects.all()
    serializer_class = WorkActivitySerializer
    filter_backends = (DjangoFilterBackend, SearchFilter, OrderingFilter)
    filterset_fields = [
        'record_date',
        'record_by'
    ]

    def get_permissions(self):
        if self.action == 'list':
            permission_classes = [AllowAny]
        else:
            permission_classes = [AllowAny]

        return [permission() for permission in permission_classes]    

    
    def get_queryset(self):
        queryset = WorkActivity.objects.all()

        """
        if self.request.user.is_anonymous:
            queryset = Company.objects.none()

        else:
            user = self.request.user
            company_employee = CompanyEmployee.objects.filter(employee=user)
            company = company_employee[0].company
            
            if company.company_type == 'AD':
                queryset = Activity.objects.all()
            else:
                queryset = Activity.objects.filter(company=company.id)
        """
        return queryset

    @action(methods=['GET'], detail=False)
    def extended(self, request, *args, **kwargs):
        
        queryset = WorkActivity.objects.all()
        serializer_class = WorkActivityExtendedSerializer(queryset, many=True)
        
        return Response(serializer_class.data)


class WorkActivityTeamViewSet(NestedViewSetMixin, viewsets.ModelViewSet):
    queryset = WorkActivityTeam.objects.all()
    serializer_class = WorkActivityTeamSerializer
    filter_backends = (DjangoFilterBackend, SearchFilter, OrderingFilter)
    filterset_fields = [
        'work_activity',
        'teammate',
        'created_at'
    ]

    def get_permissions(self):
        if self.action == 'list':
            permission_classes = [AllowAny]
        else:
            permission_classes = [AllowAny]

        return [permission() for permission in permission_classes]    

    
    def get_queryset(self):
        queryset = WorkActivityTeam.objects.all()

        """
        if self.request.user.is_anonymous:
            queryset = Company.objects.none()

        else:
            user = self.request.user
            company_employee = CompanyEmployee.objects.filter(employee=user)
            company = company_employee[0].company
            
            if company.company_type == 'AD':
                queryset = Activity.objects.all()
            else:
                queryset = Activity.objects.filter(company=company.id)
        """
        return queryset


class WorkClassViewSet(NestedViewSetMixin, viewsets.ModelViewSet):
    queryset = WorkClass.objects.all()
    serializer_class = WorkClassSerializer
    filter_backends = (DjangoFilterBackend, SearchFilter, OrderingFilter)
    filterset_fields = [
        'name', 'description', 'record_by', 'modified_by'
    ]

    def get_permissions(self):
        if self.action == 'list':
            permission_classes = [AllowAny]
        else:
            permission_classes = [AllowAny]

        return [permission() for permission in permission_classes]    

    
    def get_queryset(self):
        queryset = WorkClass.objects.all()
        return queryset

    @action(methods=['GET'], detail=False)
    def extended(self, request, *args, **kwargs):
        
        queryset = WorkClass.objects.all()
        serializer_class = WorkClassExtendedSerializer(queryset, many=True)
        
        return Response(serializer_class.data)


class WorkCategoryViewSet(NestedViewSetMixin, viewsets.ModelViewSet):
    queryset = WorkCategory.objects.all()
    serializer_class = WorkCategorySerializer
    filter_backends = (DjangoFilterBackend, SearchFilter, OrderingFilter)
    filterset_fields = [
        'name', 'description', 'detail_description', 'status', 'record_by', 'modified_by'
    ]

    def get_permissions(self):
        if self.action == 'list':
            permission_classes = [AllowAny]
        else:
            permission_classes = [AllowAny]

        return [permission() for permission in permission_classes]    

    
    def get_queryset(self):
        queryset = WorkCategory.objects.all()
        return queryset

    @action(methods=['GET'], detail=False)
    def extended(self, request, *args, **kwargs):
        
        queryset = WorkCategory.objects.all()
        serializer_class = WorkCategoryExtendedSerializer(queryset, many=True)
        
        return Response(serializer_class.data)


class WorkRequestViewSet(NestedViewSetMixin, viewsets.ModelViewSet):
    queryset = WorkRequest.objects.all()
    serializer_class = WorkRequestSerializer
    filter_backends = (DjangoFilterBackend, SearchFilter, OrderingFilter)
    filterset_fields = [
        'description', 'long_description', 'record_by', 'modified_by'
    ]

    def get_permissions(self):
        if self.action == 'list':
            permission_classes = [AllowAny]
        else:
            permission_classes = [AllowAny]

        return [permission() for permission in permission_classes]    

    
    def get_queryset(self):
        queryset = WorkRequest.objects.all()

        """
        if self.request.user.is_anonymous:
            queryset = Company.objects.none()

        else:
            user = self.request.user
            company_employee = CompanyEmployee.objects.filter(employee=user)
            company = company_employee[0].company
            
            if company.company_type == 'AD':
                queryset = Activity.objects.all()
            else:
                queryset = Activity.objects.filter(company=company.id)
        """
        return queryset  

    @action(methods=['GET'], detail=False)
    def extended(self, request, *args, **kwargs):
        
        queryset = WorkRequest.objects.all()
        serializer_class = WorkRequestExtendedSerializer(queryset, many=True)
        
        return Response(serializer_class.data)


class WorkRequestStatusViewSet(NestedViewSetMixin, viewsets.ModelViewSet):
    queryset = WorkRequestStatus.objects.all()
    serializer_class = WorkRequestStatusSerializer
    filter_backends = (DjangoFilterBackend, SearchFilter, OrderingFilter)
    filterset_fields = [
        'work_request_id', 'status', 'record_by', 'modified_by'
    ]

    def get_permissions(self):
        if self.action == 'list':
            permission_classes = [AllowAny]
        else:
            permission_classes = [AllowAny]

        return [permission() for permission in permission_classes]    

    
    def get_queryset(self):
        queryset = WorkRequestStatus.objects.all()
        return queryset

    @action(methods=['GET'], detail=False)
    def extended(self, request, *args, **kwargs):
        
        queryset = WorkRequestStatus.objects.all()
        serializer_class = WorkRequestStatusExtendedSerializer(queryset, many=True)
        
        return Response(serializer_class.data)


class MeasurementTypeViewSet(NestedViewSetMixin, viewsets.ModelViewSet):
    queryset = MeasurementType.objects.all()
    serializer_class = MeasurementTypeSerializer
    filter_backends = (DjangoFilterBackend, SearchFilter, OrderingFilter)
    filterset_fields = [
        'identifier', 'name', 'description', 'record_by', 'modified_by'
    ]

    def get_permissions(self):
        if self.action == 'list':
            permission_classes = [AllowAny]
        else:
            permission_classes = [AllowAny]

        return [permission() for permission in permission_classes]    

    
    def get_queryset(self):
        queryset = MeasurementType.objects.all()
        return queryset

    @action(methods=['GET'], detail=False)
    def extended(self, request, *args, **kwargs):
        
        queryset = MeasurementType.objects.all()
        serializer_class = MeasurementTypeExtendedSerializer(queryset, many=True)
        
        return Response(serializer_class.data)


class OperationalReadingViewSet(NestedViewSetMixin, viewsets.ModelViewSet):
    queryset = OperationalReading.objects.all()
    serializer_class = OperationalReadingSerializer
    filter_backends = (DjangoFilterBackend, SearchFilter, OrderingFilter)
    filterset_fields = [
        'asset_id', 'badge_number', 'record_by', 'modified_by'
    ]

    def get_permissions(self):
        if self.action == 'list':
            permission_classes = [AllowAny]
        else:
            permission_classes = [AllowAny]

        return [permission() for permission in permission_classes]    

    
    def get_queryset(self):
        queryset = OperationalReading.objects.all()

        """
        if self.request.user.is_anonymous:
            queryset = Company.objects.none()

        else:
            user = self.request.user
            company_employee = CompanyEmployee.objects.filter(employee=user)
            company = company_employee[0].company
            
            if company.company_type == 'AD':
                queryset = Activity.objects.all()
            else:
                queryset = Activity.objects.filter(company=company.id)
        """
        return queryset  

    @action(methods=['GET'], detail=False)
    def extended(self, request, *args, **kwargs):
        
        queryset = OperationalReading.objects.all()
        serializer_class = OperationalReadingExtendedSerializer(queryset, many=True)
        
        return Response(serializer_class.data)