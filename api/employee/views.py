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
    Employee,
    FailureProfile,
    ApprovalProfile
)

from .serializers import (
    EmployeeSerializer,
    FailureProfileSerializer,
    ApprovalProfileSerializer,
)

class EmployeeViewSet(NestedViewSetMixin, viewsets.ModelViewSet):
    queryset = Employee.objects.all()
    serializer_class = EmployeeSerializer
    filter_backends = (DjangoFilterBackend, SearchFilter, OrderingFilter)

    def get_permissions(self):
        if self.action == 'list':
            permission_classes = [AllowAny]
        else:
            permission_classes = [AllowAny]

        return [permission() for permission in permission_classes]

    def get_queryset(self):
        queryset = Employee.objects.all()

        return queryset

class FailureProfileViewSet(NestedViewSetMixin, viewsets.ModelViewSet):
    queryset = FailureProfile.objects.all()
    serializer_class = FailureProfileSerializer
    filter_backends = (DjangoFilterBackend, SearchFilter, OrderingFilter)

    def get_permissions(self):
        if self.action == 'list':
            permission_classes = [AllowAny]
        else:
            permission_classes = [AllowAny]

        return [permission() for permission in permission_classes]

    def get_queryset(self):
        queryset = FailureProfile.objects.all()

        return queryset

class ApprovalProfileViewSet(NestedViewSetMixin, viewsets.ModelViewSet):
    queryset = ApprovalProfile.objects.all()
    serializer_class = ApprovalProfileSerializer
    filter_backends = (DjangoFilterBackend, SearchFilter, OrderingFilter)

    def get_permissions(self):
        if self.action == 'list':
            permission_classes = [AllowAny]
        else:
            permission_classes = [AllowAny]

        return [permission() for permission in permission_classes]

    def get_queryset(self):
        queryset = ApprovalProfile.objects.all()

        return queryset
