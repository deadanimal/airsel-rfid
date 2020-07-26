from datetime import datetime, timedelta

from django.conf import settings
from django.conf.urls import include, url
from django.contrib.gis import admin

from rest_framework import routers
from rest_framework_extensions.routers import NestedRouterMixin

from django.views.generic import TemplateView, RedirectView

from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
    TokenVerifyView
)

from users.views import (
    MyTokenObtainPairView
)

class NestedDefaultRouter(NestedRouterMixin, routers.DefaultRouter):
    pass

router = NestedDefaultRouter()

# Asset
from assets.views import (
    AssetViewSet,
    AssetGroupViewSet,
    AssetTypeViewSet,
    RfidViewSet
)

assets_router = router.register(
    'assets', AssetViewSet
)

asset_groups_router = router.register(
    'asset-groups', AssetGroupViewSet
)

asset_types_router = router.register(
    'asset-types', AssetTypeViewSet
)

rfids_router = router.register(
    'rfids', RfidViewSet
)

# Locations app
from locations.views import (
    RegionViewSet,
    StoreViewSet,
    LocationViewSet
)

regions_router = router.register(
    'regions', RegionViewSet
)

stores_router = router.register(
    'stores', StoreViewSet
)

locations_router = router.register(
    'locations', LocationViewSet
)

# Medias app
from medias.views import (
    MediaViewSet
)

medias_router = router.register(
    'medias', MediaViewSet
)

# Notifications app
from notifications.views import (
    NotificationViewSet
)

notifications_router = router.register(
    'notifications', NotificationViewSet
)

# Operations app
from operations.views import (
    IssueTypeViewSet,
    MaintenanceViewSet,
    OperationalReadingViewSet,
    WorkOrderViewSet,
    WorkActivityViewSet,
    WorkActivityTeamViewSet,
    WorkRequestViewSet
)

issue_types_router = router.register(
    'issue-types', IssueTypeViewSet
)

maintenances_router = router.register(
    'maintenances', MaintenanceViewSet
)

operational_readings_router = router.register(
    'operational-readings', OperationalReadingViewSet
)

work_orders_router = router.register(
    'work-orders', WorkOrderViewSet
)

work_activities_router = router.register(
    'work-activities', WorkActivityViewSet
)

work_activity_teams_router = router.register(
    'work-activity-teams', WorkActivityTeamViewSet
)

work_requests_router = router.register(
    'work-requests', WorkRequestViewSet
)

# Organisations app
from organisations.views import (
    OrganisationViewSet
)

organisations_router = router.register(
    'organisations', OrganisationViewSet
)

# Stock
from stocks.views import (
    StockViewSet,
    ReceiveViewSet,
    IssuanceViewSet,
    ReturnViewSet,
    PurchaseViewSet,
    DisposeViewSet,
    ReversalViewSet,
    TransferViewSet,
    CountViewSet
)

stocks_router = router.register(
    'stocks', StockViewSet
)

receives_router = router.register(
    'stock-receives', ReceiveViewSet
)

issuances_router = router.register(
    'stock-issuances', IssuanceViewSet
)

returns_router = router.register(
    'stock-returns', ReturnViewSet
)

purchases_router = router.register(
    'stock-purchases', PurchaseViewSet
)

disposes_router = router.register(
    'stock-disposes', DisposeViewSet
)

reversals_router = router.register(
    'stock-reversals', ReversalViewSet
)

transfers_router = router.register(
    'stock-transfers', TransferViewSet
)

counts_router = router.register(
    'stock-counts', CountViewSet
)

# Users app
from users.views import (
    CustomUserViewSet
)

users_router = router.register(
    'users', CustomUserViewSet
)

urlpatterns = [
    url(r'^email-verification/$',
        TemplateView.as_view(template_name="email_verification.html"),
        name='email-verification'), # Tukar sini
    url(r'^password-reset/(?P<uidb64>[0-9A-Za-z_\-]+)/(?P<token>[0-9A-Za-z]{1,13}-[0-9A-Za-z]{1,20})/$',
        TemplateView.as_view(template_name="password_reset_confirm.html"),
        name='password_reset_confirm'
    ),
    url(r'v1/', include(router.urls)),
    url(r'auth/', include('rest_auth.urls')),
    url(r'auth/registration/', include('rest_auth.registration.urls')),

    url('auth/obtain/', MyTokenObtainPairView.as_view(), name='token_obtain_pair'),
    url('auth/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    url('auth/verify/', TokenVerifyView.as_view(), name='token_verify')
]