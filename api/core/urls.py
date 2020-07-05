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

from assets.views import (
    AssetViewSet
)

assets_router = router.register(
    'assets', AssetViewSet
)

# Locations app

from locations.views import (
    RegionViewSet,
    StoreViewSet
)

regions_router = router.register(
    'regions', RegionViewSet
)

stores_router = router.register(
    'stores', StoreViewSet
)

# Operations app

from operations.views import (
    ActivityViewSet,
    OperationalReadingViewSet,
    WorkActivityViewSet,
    WorkRequestViewSet
)

activities_router = router.register(
    'activities', ActivityViewSet
)

operational_readings_router = router.register(
    'operational-readings', OperationalReadingViewSet
)

work_activities_router = router.register(
    'work-activities', WorkActivityViewSet
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
    url(r'^password-reset/confirm/(?P<uidb64>[0-9A-Za-z_\-]+)/(?P<token>[0-9A-Za-z]{1,13}-[0-9A-Za-z]{1,20})/$',
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