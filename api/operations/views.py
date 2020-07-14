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
    Maintenance,
    IssueType,
    WorkActivity,
    WorkActivityTeam,
    WorkRequest,
    OperationalReading
)

from .serializers import (
    MaintenanceSerializer,
    IssueTypeSerializer,
    WorkActivitySerializer,
    WorkActivityTeamSerializer,
    WorkRequestSerializer,
    OperationalReadingSerializer
)

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
 

class WorkActivityViewSet(NestedViewSetMixin, viewsets.ModelViewSet):
    queryset = WorkActivity.objects.all()
    serializer_class = WorkActivitySerializer
    filter_backends = (DjangoFilterBackend, SearchFilter, OrderingFilter)
    filterset_fields = [
        'completed_at',
        'asset',
        'activity_type',
        'status',
        'due_date'
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


class WorkRequestViewSet(NestedViewSetMixin, viewsets.ModelViewSet):
    queryset = WorkRequest.objects.all()
    serializer_class = WorkRequestSerializer
    filter_backends = (DjangoFilterBackend, SearchFilter, OrderingFilter)
    filterset_fields = [
        'asset',
        'issue_type',
        'created_at'
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


class OperationalReadingViewSet(NestedViewSetMixin, viewsets.ModelViewSet):
    queryset = OperationalReading.objects.all()
    serializer_class = OperationalReadingSerializer
    filter_backends = (DjangoFilterBackend, SearchFilter, OrderingFilter)
    filterset_fields = [
        'asset',
        'created_at'
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