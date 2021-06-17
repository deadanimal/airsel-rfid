from datetime import datetime
from calendar import timegm
import json

from django.contrib.auth.forms import PasswordResetForm
from django.conf import settings
from django.utils.translation import gettext as _
from rest_framework import serializers
from django.utils.timezone import now

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
    OperationalReading,
    QuestionsValidValue,
    ServiceHistoriesQuestions,
    AssetLocationAssetListServiceHistories,
    WorkOrderActivityCompletionAssetLocationAssetList,
    WorkOrderActivityCompletion,
    ServiceHistory,ServiceHistoryQuestion,ServiceHistoryQuestionValidValue,
    Planner,MaintenanceManager,WorkRequest,MainOperation,Function,LocationType,
    SubFunction,CostCenter,Operation,WorkActivityEmployee,
    WorkOrderActivityCompletionAssetLocationAssetListInbound,
    AssetLocationAssetListServiceHistoriesInbound
)

from users.serializers import (
    CustomUserSerializer
)

from medias.serializers import (
    MediaSerializer
)

class OwningOrganizationSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = OwningOrganization
        fields = '__all__'

class OwningOrganizationExtendedSerializer(serializers.ModelSerializer):
    record_by = CustomUserSerializer(read_only=True)
    modified_by = CustomUserSerializer(read_only=True)
    
    class Meta:
        model = OwningOrganization
        fields = '__all__'

class BoSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = Bo
        fields = '__all__'

class BoExtendedSerializer(serializers.ModelSerializer):
    record_by = CustomUserSerializer(read_only=True)
    modified_by = CustomUserSerializer(read_only=True)
    
    class Meta:
        model = Bo
        fields = '__all__'

class MaintenanceSerializer(serializers.ModelSerializer):

    class Meta:
        model = Maintenance
        fields = '__all__'

class IssueTypeSerializer(serializers.ModelSerializer):

    class Meta:
        model = IssueType
        fields = '__all__'

class WorkOrderSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = WorkOrder
        fields = '__all__'

class WorkActivitySerializer(serializers.ModelSerializer):

    class Meta:
        model = WorkActivity
        fields = '__all__'

class WorkActivityExtendedSerializer(serializers.ModelSerializer):
    record_by = CustomUserSerializer(read_only=True)
    modified_by = CustomUserSerializer(read_only=True)
    
    class Meta:
        model = WorkActivity
        fields = '__all__'

class WorkActivityTeamSerializer(serializers.ModelSerializer):

    class Meta:
        model = WorkActivityTeam
        fields = '__all__'

class WorkClassSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = WorkClass
        fields = '__all__'

class WorkClassExtendedSerializer(serializers.ModelSerializer):
    record_by = CustomUserSerializer(read_only=True)
    modified_by = CustomUserSerializer(read_only=True)
    
    class Meta:
        model = WorkClass
        fields = '__all__'

class WorkCategorySerializer(serializers.ModelSerializer):
    
    class Meta:
        model = WorkCategory
        fields = '__all__'

class WorkCategoryExtendedSerializer(serializers.ModelSerializer):
    record_by = CustomUserSerializer(read_only=True)
    modified_by = CustomUserSerializer(read_only=True)
    
    class Meta:
        model = WorkCategory
        fields = '__all__'

class WorkRequestSerializer(serializers.ModelSerializer):

    class Meta:
        model = WorkRequest
        fields = '__all__'

class WorkRequestExtendedSerializer(serializers.ModelSerializer):
    attachment = MediaSerializer(read_only=True)
    record_by = CustomUserSerializer(read_only=True)
    modified_by = CustomUserSerializer(read_only=True)
    
    class Meta:
        model = WorkRequest
        fields = '__all__'

class WorkRequestStatusSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = WorkRequestStatus
        fields = '__all__'

# class WorkRequestStatusExtendedSerializer(serializers.ModelSerializer):
#     work_request_id = WorkRequestSerializer(read_only=True)
#     # record_by = CustomUserSerializer(read_only=True)
#     # modified_by = CustomUserSerializer(read_only=True)
    
#     class Meta:
#         model = WorkRequestStatus
#         fields = '__all__'

class MeasurementTypeSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = MeasurementType
        fields = '__all__'

class MeasurementTypeExtendedSerializer(serializers.ModelSerializer):
    record_by = CustomUserSerializer(read_only=True)
    modified_by = CustomUserSerializer(read_only=True)
    
    class Meta:
        model = MeasurementType
        fields = '__all__'

class OperationalReadingSerializer(serializers.ModelSerializer):

    class Meta:
        model = OperationalReading
        fields = '__all__'

class OperationalReadingExtendedSerializer(serializers.ModelSerializer):

    record_by = CustomUserSerializer(read_only=True)
    modified_by = CustomUserSerializer(read_only=True)
    
    class Meta:
        model = OperationalReading
        fields = '__all__'

# start copied from dev api

class WorkOrderActivityCompletionAssetLocationAssetListSerializer(serializers.ModelSerializer):

    class Meta:
        model = WorkOrderActivityCompletionAssetLocationAssetList
        fields = '__all__'

class AssetLocationAssetListServiceHistoriesSerializer(serializers.ModelSerializer):

    class Meta:
        model = AssetLocationAssetListServiceHistories
        fields = '__all__'

class ServiceHistoriesQuestionsSerializer(serializers.ModelSerializer):

    class Meta:
        model = ServiceHistoriesQuestions
        fields = '__all__'

class QuestionsValidValueSerializer(serializers.ModelSerializer):

    class Meta:
        model = QuestionsValidValue
        fields = '__all__'

class WorkOrderActivityCompletionSerializer(serializers.ModelSerializer):

	class Meta:
		model = WorkOrderActivityCompletion
		fields = '__all__'

class ServiceHistoriesQuestionsExtendedSerializer(serializers.ModelSerializer):
    
    valid_value = QuestionsValidValueSerializer(many=True)
    class Meta:
        model = ServiceHistoriesQuestions
        fields = '__all__'

class AssetLocationAssetListServiceHistoriesExtendedSerializer(serializers.ModelSerializer):
    
    question = ServiceHistoriesQuestionsExtendedSerializer(many=True)
    class Meta:
        model = AssetLocationAssetListServiceHistories
        fields = '__all__'

class WorkOrderActivityCompletionAssetLocationAssetListExtendedSerializer(serializers.ModelSerializer):

    service_histories = AssetLocationAssetListServiceHistoriesExtendedSerializer(many=True)
    class Meta:
        model = WorkOrderActivityCompletionAssetLocationAssetList
        fields = '__all__'

class WorkOrderActivityCompletionExtendedSerializer(serializers.ModelSerializer):

    asset_location_asset_list = WorkOrderActivityCompletionAssetLocationAssetListExtendedSerializer(many=True)
    class Meta:
        model = WorkOrderActivityCompletion
        fields = '__all__'
    
# end copied frm dev api

class ServiceHistorySerializer(serializers.ModelSerializer):
    
    class Meta:
        model = ServiceHistory
        fields = '__all__'

class ServiceHistoryQuestionSerializer(serializers.ModelSerializer):

    class Meta:
        model = ServiceHistoryQuestion
        fields = '__all__'

class ServiceHistoryQuestionValidValueSerializer(serializers.ModelSerializer):

    class Meta:
        model = ServiceHistoryQuestionValidValue
        fields = '__all__'

class PlannerSerializer(serializers.ModelSerializer):

    class Meta:
        model = Planner
        fields = '__all__'

class MaintenanceManagerSerializer(serializers.ModelSerializer):

    class Meta:
        model = MaintenanceManager
        fields = '__all__'

# class WorkRequestSerializer(serializers.ModelSerializer):

#     class Meta:
#         model = WorkRequest
#         fields = '__all__'

class MainOperationSerializer(serializers.ModelSerializer):

    class Meta:
        model = MainOperation
        fields = '__all__'

class FunctionSerializer(serializers.ModelSerializer):

    class Meta:
        model = Function
        fields = '__all__'

class LocationTypeSerializer(serializers.ModelSerializer):

    class Meta:
        model = LocationType
        fields = '__all__'

class SubFunctionSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = SubFunction
        fields = '__all__'

class CostCenterSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = CostCenter
        fields = '__all__'

class OperationSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = Operation
        fields = '__all__'

class WorkActivityEmployeeSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = WorkActivityEmployee
        fields = '__all__'

class WorkOrderActivityCompletionAssetLocationAssetListInboundSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = WorkOrderActivityCompletionAssetLocationAssetListInbound
        fields = '__all__'

class AssetLocationAssetListServiceHistoriesInboundSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = AssetLocationAssetListServiceHistoriesInbound
        fields = '__all__'
