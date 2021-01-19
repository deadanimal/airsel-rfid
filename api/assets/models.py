# -*- coding: utf-8 -*-
from __future__ import unicode_literals
import uuid

from django.contrib.gis.db import models
from django.core.validators import MaxValueValidator, MinValueValidator

from simple_history.models import HistoricalRecords

from locations.models import (
    Region,
    Location
)

from medias.models import (
    Media
)

from organisations.models import (
    Organisation
)

from users.models import (
    CustomUser
)

from core.helpers import PathAndRename

class Rfid(models.Model):

    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    name = models.CharField(max_length=100, default='NA')
    rfid_id = models.CharField(max_length=100, default='NA')

    created_at = models.DateTimeField(auto_now_add=True)
    modified_at = models.DateTimeField(auto_now=True)

    class meta:
        ordering = ['name']
    
    def __str__(self):
        return self.name

class AssetGroup(models.Model):

    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    name = models.CharField(max_length=100, default='NA')
    
    CATEGORY = [
        ('AI', 'Asset Identity'),
        ('PG', 'Primary Category'),
        ('S1', 'Sub Category 1'),
        ('S2', 'Sub Category 2')
    ]
    category = models.CharField(max_length=2, choices=CATEGORY, default='AI')

    created_at = models.DateTimeField(auto_now_add=True)
    modified_at = models.DateTimeField(auto_now=True)

    class meta:
        ordering = ['name']
    
    def __str__(self):
        return self.name

class AssetType(models.Model):

    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    name = models.CharField(max_length=100, default='NA')
    
    CATEGORY = [
        ('AC', 'Asset / Component'),
        ('AG', 'Asset Category'),
        ('AT', 'Asset Type (Asset Primary Category)')
    ]
    category = models.CharField(max_length=2, choices=CATEGORY, default='AI')

    created_at = models.DateTimeField(auto_now_add=True)
    modified_at = models.DateTimeField(auto_now=True)

class AssetMeasurementType(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    measurement_type = models.CharField(max_length=100, blank=True )

    created_date = models.DateTimeField(auto_now_add=True)
    modified_date = models.DateTimeField(auto_now=True)

    class meta:
        ordering = ['-created_date']

    def __str__(self):
        return self.measurement_type

class AssetAttribute(models.Model):

    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)

    asset_id = models.CharField(max_length=100,default=0)
    characteristic_type = models.CharField(max_length=100,default=0)
    characteristic_value = models.CharField(max_length=100,default=0)
    adhoc_value = models.CharField(max_length=100,default=0)

    created_date = models.DateTimeField(auto_now_add=True)
    modified_date = models.DateTimeField(auto_now=True)

    class meta:
        ordering = ['-created_date']

    def __str__(self):
        return self.characteristic_type + ' ' + self.adhoc_value + ' ' + self.characteristic_value

class Asset(models.Model):

    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    asset_id = models.CharField(max_length=100, blank=True )
    asset_type = models.CharField(max_length=100, blank=True )
    transaction_type = models.CharField(max_length=100, blank=True )
    description = models.CharField(max_length=100, blank=True )
    bo = models.CharField(max_length=100, blank=True )
    bo_status = models.CharField(max_length=100, blank=True )

    owning_access_group = models.CharField(max_length=100, blank=True )
    effective_datetime = models.DateTimeField(auto_now=True)
    node_id = models.CharField(max_length=100, blank=True )
    badge_no = models.CharField(max_length=100, blank=True )
    serial_no = models.CharField(max_length=100, blank=True )
    pallet_no = models.CharField(max_length=100, blank=True )

    handed_over_assist = models.CharField(max_length=100, blank=True )
    fixed_asset_no = models.CharField(max_length=100, blank=True )
    scada_id = models.CharField(max_length=100, blank=True )
    condition_rating = models.CharField(max_length=100, blank=True )
    condifence_rating = models.CharField(max_length=100, blank=True)

    maintenance_specification = models.CharField(max_length=100, blank=True )
    measurement_types = models.ManyToManyField(AssetMeasurementType, null=True,default='')
    bom_part_id = models.CharField(max_length=100, blank=True )
    attached_to_assist_id = models.CharField(max_length=100, blank=True )
    vehicle_identification_num = models.CharField(max_length=100, blank=True )
    license_number = models.CharField(max_length=100, blank=True )

    purchase_order_num = models.CharField(max_length=100, blank=True )
    metrology_firmware = models.CharField(max_length=100, blank=True )
    nic_firmware = models.CharField(max_length=100, blank=True )
    configuration = models.CharField(max_length=100, blank=True )

    warranty_expiration_date = models.CharField(max_length=100, blank=True )
    warranty_detail = models.CharField(max_length=100, blank=True )
    vendor_part_no = models.CharField(max_length=100, blank=True )
    asset_attributes = models.ManyToManyField(AssetAttribute, null=True,default='')

    submitted_datetime = models.DateTimeField(null=True, default=None)
    registered_datetime = models.DateTimeField(null=True, default=None)
    created_date = models.DateTimeField(auto_now_add=True)
    modified_date = models.DateTimeField(auto_now=True)

    class meta:
        ordering = ['name']
    
    def __str__(self):
        return self.name

class AssetRegistration(models.Model):

    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    asset_id = models.CharField(max_length=200, default='',null=True, blank=True)
    badge_no = models.CharField(max_length=100, default='',null=True, blank=True)
    node_id = models.CharField(max_length=200, default='',null=True, blank=True)
    hex_code = models.CharField(max_length=200, default='',null=True, blank=True)
    asset_identity = models.CharField(max_length=200, default='',null=True, blank=True)
    parent_location = models.CharField(max_length=200, default='',null=True, blank=True)
    location_description = models.CharField(max_length=200, default='',null=True, blank=True)
    building = models.CharField(max_length=200, default='',null=True, blank=True)
    address_line_1 = models.CharField(max_length=200, default='',null=True, blank=True)
    address_line_2 = models.CharField(max_length=200, default='',null=True, blank=True)
    address_line_3 = models.CharField(max_length=200, default='',null=True, blank=True)
    city = models.CharField(max_length=200, default='',null=True, blank=True)
    state = models.CharField(max_length=200, default='',null=True, blank=True)
    postal_code = models.CharField(max_length=200, default='',null=True, blank=True)
    country = models.CharField(max_length=200, default='',null=True, blank=True)
    tag_number = models.CharField(max_length=200, default='',null=True, blank=True)
    service_area = models.CharField(max_length=200, default='',null=True, blank=True)
    location_main_contact = models.CharField(max_length=200, default='',null=True, blank=True)
    location_asset_maintenance_manager = models.CharField(max_length=200, default='',null=True, blank=True)
    maintenance_planner = models.CharField(max_length=200, default='',null=True, blank=True)
    gis_esri_id = models.CharField(max_length=200, default='',null=True, blank=True)
    latitude = models.CharField(max_length=200, default='',null=True, blank=True)
    longitude = models.CharField(max_length=200, default='',null=True, blank=True)
    asset_criticality = models.CharField(max_length=200, default='',null=True, blank=True)
    cost_center = models.CharField(max_length=200, default='',null=True, blank=True)
    asset_owning_department = models.CharField(max_length=200, default='',null=True, blank=True)
    main_operation = models.CharField(max_length=200, default='',null=True, blank=True)
    region = models.CharField(max_length=200, default='',null=True, blank=True)
    operation = models.CharField(max_length=200, default='',null=True, blank=True)
    process_function = models.CharField(max_length=200, default='',null=True, blank=True)
    sub_process_system = models.CharField(max_length=200, default='',null=True, blank=True)
    asset_or_component_type = models.CharField(max_length=200, default='',null=True, blank=True)
    asset_class_asset_category = models.CharField(max_length=200, default='',null=True, blank=True)
    handed_over_asset_or_procured = models.CharField(max_length=200, default='',null=True, blank=True)
    internal_asset_identity = models.CharField(max_length=200, default='',null=True, blank=True)
    asset_primary_category = models.CharField(max_length=200, default='',null=True, blank=True)
    sub_category_1 = models.CharField(max_length=200, default='',null=True, blank=True)
    sub_category_2 = models.CharField(max_length=200, default='',null=True, blank=True)
    brand = models.CharField(max_length=200, default='',null=True, blank=True)
    model_number = models.CharField(max_length=200, default='',null=True, blank=True)
    size_capacity_1 = models.CharField(max_length=200, default='',null=True, blank=True)
    size_capacity_1_unit_measurement = models.CharField(max_length=200, default='',null=True, blank=True)
    size_capacity_2 = models.CharField(max_length=200, default='',null=True, blank=True)
    size_capacity_2_unit_measurement = models.CharField(max_length=200, default='',null=True, blank=True)
    size_capacity_3 = models.CharField(max_length=200, default='',null=True, blank=True)
    size_capacity_3_unit_measurement = models.CharField(max_length=200, default='',null=True, blank=True)
    parent_asset_plate_number = models.CharField(max_length=200, default='',null=True, blank=True)
    asset_plate_number = models.CharField(max_length=200, default='',null=True, blank=True)
    detailed_description = models.CharField(max_length=200, default='',null=True, blank=True)
    serial_number = models.CharField(max_length=200, default='',null=True, blank=True)
    asset_tag_number = models.CharField(max_length=200, default='',null=True, blank=True)
    purchase_date_installed_handed_over_date = models.CharField(max_length=200, default='',null=True, blank=True)
    condition_rating = models.CharField(max_length=200, default='',null=True, blank=True)
    status = models.CharField(max_length=200, default='',null=True, blank=True)
    maintenance_specification = models.CharField(max_length=200, default='',null=True, blank=True)
    measurement_type = models.CharField(max_length=200, default='',null=True, blank=True)
    warranty = models.CharField(max_length=200, default='',null=True, blank=True)
    actual_warranty_period = models.CharField(max_length=200, default='',null=True, blank=True)
    warranty_vendor_name = models.CharField(max_length=200, default='',null=True, blank=True)
    bottom_water_level = models.CharField(max_length=200, default='',null=True, blank=True)
    closing_torque = models.CharField(max_length=200, default='',null=True, blank=True)
    dimention = models.CharField(max_length=200, default='',null=True, blank=True)
    frequency = models.CharField(max_length=200, default='',null=True, blank=True)
    infrastructure_status = models.CharField(max_length=200, default='',null=True, blank=True)
    installation = models.CharField(max_length=200, default='',null=True, blank=True)
    manufacturer = models.CharField(max_length=200, default='',null=True, blank=True)
    material_type = models.CharField(max_length=200, default='',null=True, blank=True)
    no_of_channel = models.CharField(max_length=200, default='',null=True, blank=True)
    opening_torque = models.CharField(max_length=200, default='',null=True, blank=True)
    pump_head = models.CharField(max_length=200, default='',null=True, blank=True)
    staging_height = models.CharField(max_length=200, default='',null=True, blank=True)
    top_water_level = models.CharField(max_length=200, default='',null=True, blank=True)
    valve_pressure_rating = models.CharField(max_length=200, default='',null=True, blank=True)
    vehicle_engine_number = models.CharField(max_length=200, default='',null=True, blank=True)
    vehicle_insurance_auto_windscreen_insured = models.CharField(max_length=200, default='',null=True, blank=True)
    vehicle_insurance_date_period_to = models.CharField(max_length=200, default='',null=True, blank=True)
    vehicle_insurance_sum_insured = models.CharField(max_length=200, default='',null=True, blank=True)
    vehicle_owner_status = models.CharField(max_length=200, default='',null=True, blank=True)
    vehicle_puspakom_expired_date = models.CharField(max_length=200, default='',null=True, blank=True)
    vehicle_roadtax_expired_date = models.CharField(max_length=200, default='',null=True, blank=True)
    vehicle_seating_capacity = models.CharField(max_length=200, default='',null=True, blank=True)
    communication_protocol = models.CharField(max_length=200, default='',null=True, blank=True)
    environmental_performance = models.CharField(max_length=200, default='',null=True, blank=True)
    horse_power = models.CharField(max_length=200, default='',null=True, blank=True)
    infrastructure_status_reason = models.CharField(max_length=200, default='',null=True, blank=True)
    insulation = models.CharField(max_length=200, default='',null=True, blank=True)
    manufacturer_year = models.CharField(max_length=200, default='',null=True, blank=True)
    model = models.CharField(max_length=200, default='',null=True, blank=True)
    no_of_phases = models.CharField(max_length=200, default='',null=True, blank=True)
    outlet_diameter = models.CharField(max_length=200, default='',null=True, blank=True)
    revolutions_per_minute = models.CharField(max_length=200, default='',null=True, blank=True)
    supply_location = models.CharField(max_length=200, default='',null=True, blank=True)
    type = models.CharField(max_length=200, default='',null=True, blank=True)
    vehicle_chasis_number = models.CharField(max_length=200, default='',null=True, blank=True)
    vehicle_insurance_vendor = models.CharField(max_length=200, default='',null=True, blank=True)
    vehicle_insurance_cover_note_number = models.CharField(max_length=200, default='',null=True, blank=True)
    vehicle_insurance_no_claim_discount = models.CharField(max_length=200, default='',null=True, blank=True)
    vehicle_insurance_total_premium = models.CharField(max_length=200, default='',null=True, blank=True)
    vehicle_register_date = models.CharField(max_length=200, default='',null=True, blank=True)
    vehicle_spad_permit_date_period_to = models.CharField(max_length=200, default='',null=True, blank=True)
    vehicle_spad_no_license_operator = models.CharField(max_length=200, default='',null=True, blank=True)
    vehicle_registration_owner = models.CharField(max_length=200, default='',null=True, blank=True)
    capacity_size = models.CharField(max_length=200, default='',null=True, blank=True)
    coverage_range = models.CharField(max_length=200, default='',null=True, blank=True)
    flow_rate = models.CharField(max_length=200, default='',null=True, blank=True)
    hysteresis = models.CharField(max_length=200, default='',null=True, blank=True)
    inlet_diameter = models.CharField(max_length=200, default='',null=True, blank=True)
    legal_name = models.CharField(max_length=200, default='',null=True, blank=True)
    manufacture_part_number = models.CharField(max_length=200, default='',null=True, blank=True)
    motor_current = models.CharField(max_length=200, default='',null=True, blank=True)
    no_of_stage = models.CharField(max_length=200, default='',null=True, blank=True)
    power_supply_type = models.CharField(max_length=200, default='',null=True, blank=True)
    source_from = models.CharField(max_length=200, default='',null=True, blank=True)
    temperature = models.CharField(max_length=200, default='',null=True, blank=True)
    valve_diameter = models.CharField(max_length=200, default='',null=True, blank=True)
    vehicle_engine_capacity = models.CharField(max_length=200, default='',null=True, blank=True)
    vehicle_model = models.CharField(max_length=200, default='',null=True, blank=True)
    vehicle_insurance_date_period_from = models.CharField(max_length=200, default='',null=True, blank=True)
    vehicle_insurance_policy_type = models.CharField(max_length=200, default='',null=True, blank=True)
    vehicle_puspakom_date_inspection = models.CharField(max_length=200, default='',null=True, blank=True)
    vehicle_roadtax_rate = models.CharField(max_length=200, default='',null=True, blank=True)
    vehicle_roadtax_renew_date = models.CharField(max_length=200, default='',null=True, blank=True)
    vehicle_spad_permit_date_period_from = models.CharField(max_length=200, default='',null=True, blank=True)
    voltage = models.CharField(max_length=200, default='',null=True, blank=True)
    asset_status = models.CharField(max_length=200, default='',null=True, blank=True)

    #Approval
    APPROVAL_STATUS = [
        ('CO', 'Completed'),
        ('IC','Incomplete'),
        ('NP','New Process'),
        ('PR','Processed'),
        ('AP', 'Approved'),
        ('RJ', 'Rejected')
    ]
    status = models.CharField(
        max_length=2,
        choices=APPROVAL_STATUS,
        default='IC'
    )
    created_at = models.DateTimeField(auto_now_add=True)
    modified_at = models.DateTimeField(auto_now=True)

class AssetBadgeFormat(models.Model):

    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    asset_uuid = models.CharField(max_length=100, default='NA')
    asset_primary_category = models.CharField(max_length=100, default='NA')
    short = models.CharField(max_length=100, default='NA')
    description = models.CharField(max_length=100, default='NA')

    STATUS_ARRAY = [
        ('AC', 'Active'),
        ('IC','Inactive')
    ]
    status = models.CharField(
        max_length=2,
        choices=STATUS_ARRAY,
        default='IC'
    )
    # status = models.CharField(max_length=100, default='NA')
    latest_no = models.CharField(max_length=100, default='NA')
    # created_at = models.DateTimeField(auto_now_add=True)

    class meta:
        ordering = ['id']
    
    def __str__(self):
        return self.id

class AssetAttributeColumn(models.Model):

    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    asset_type_id = models.CharField(max_length=100,default=0)
    bottom_water_level = models.CharField(max_length=100,default=False)
    closing_torque = models.CharField(max_length=100,default=False)
    dimention = models.CharField(max_length=100,default=False)
    frequency = models.CharField(max_length=100,default=False)
    infrastructure_status = models.CharField(max_length=100,default=False)
    installation = models.CharField(max_length=100,default=False)
    manufacturer = models.CharField(max_length=100,default=False)
    material_type = models.CharField(max_length=100,default=False)
    no_of_channel = models.CharField(max_length=100,default=False)
    opening_torque = models.CharField(max_length=100,default=False)
    pump_head = models.CharField(max_length=100,default=False)
    staging_height = models.CharField(max_length=100,default=False)
    top_water_level = models.CharField(max_length=100,default=False)
    valve_pressure_rating = models.CharField(max_length=100,default=False)
    vehicle_engine_number = models.CharField(max_length=100,default=False)
    vehicle_insurance_auto_windscreen_insured = models.CharField(max_length=100,default=False)
    vehicle_insurance_date_period_to = models.CharField(max_length=100,default=False)
    vehicle_insurance_sum_insured = models.CharField(max_length=100,default=False)
    vehicle_owner_status = models.CharField(max_length=100,default=False)
    vehicle_puspakom_expired_date = models.CharField(max_length=100,default=False)
    vehicle_roadtax_expired_date = models.CharField(max_length=100,default=False)
    vehicle_seating_capacity = models.CharField(max_length=100,default=False)
    communication_protocol = models.CharField(max_length=100,default=False)
    environmental_performance = models.CharField(max_length=100,default=False)
    horse_power = models.CharField(max_length=100,default=False)
    infrastructure_status_reason = models.CharField(max_length=100,default=False)
    insulation = models.CharField(max_length=100,default=False)
    manufacturer_year = models.CharField(max_length=100,default=False)
    model = models.CharField(max_length=100,default=False)
    no_of_phases = models.CharField(max_length=100,default=False)
    outlet_diameter = models.CharField(max_length=100,default=False)
    revolutions_per_minute = models.CharField(max_length=100,default=False)
    supply_location = models.CharField(max_length=100,default=False)
    type = models.CharField(max_length=100,default=False)
    vehicle_chasis_number = models.CharField(max_length=100,default=False)
    vehicle_insurance_vendor = models.CharField(max_length=100,default=False)
    vehicle_insurance_cover_note_number = models.CharField(max_length=100,default=False)
    vehicle_insurance_no_claim_discount = models.CharField(max_length=100,default=False)
    vehicle_insurance_total_premium = models.CharField(max_length=100,default=False)
    vehicle_register_date = models.CharField(max_length=100,default=False)
    vehicle_spad_permit_date_period_to = models.CharField(max_length=100,default=False)
    vehicle_spad_no_license_operator = models.CharField(max_length=100,default=False)
    vehicle_registration_owner = models.CharField(max_length=100,default=False)
    capacity_size = models.CharField(max_length=100,default=False)
    coverage_range = models.CharField(max_length=100,default=False)
    flow_rate = models.CharField(max_length=100,default=False)
    hysteresis = models.CharField(max_length=100,default=False)
    inlet_diameter = models.CharField(max_length=100,default=False)
    legal_name = models.CharField(max_length=100,default=False)
    manufacture_part_number = models.CharField(max_length=100,default=False)
    motor_current = models.CharField(max_length=100,default=False)
    no_of_stage = models.CharField(max_length=100,default=False)
    power_supply_type = models.CharField(max_length=100,default=False)
    source_from = models.CharField(max_length=100,default=False)
    temperature = models.CharField(max_length=100,default=False)
    valve_diameter = models.CharField(max_length=100,default=False)
    vehicle_engine_capacity = models.CharField(max_length=100,default=False)
    vehicle_model = models.CharField(max_length=100,default=False)
    vehicle_insurance_date_period_from = models.CharField(max_length=100,default=False)
    vehicle_insurance_policy_type = models.CharField(max_length=100,default=False)
    vehicle_puspakom_date_inspection = models.CharField(max_length=100,default=False)
    vehicle_roadtax_rate = models.CharField(max_length=100,default=False)
    vehicle_roadtax_renew_date = models.CharField(max_length=100,default=False)
    vehicle_spad_permit_date_period_from = models.CharField(max_length=100,default=False)
    voltage = models.CharField(max_length=100,default=False)
    asset_status = models.CharField(max_length=100,default=False)

    created_at = models.DateTimeField(auto_now_add=True)
    modified_at = models.DateTimeField(auto_now=True)

class AssetLocation(models.Model):

    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    node_id = models.CharField(max_length=100, blank=True,default='')
    location_type = models.CharField(max_length=100, blank=True,default='')
    location_disposition = models.CharField(max_length=100, blank=True,default='')
    bo = models.CharField(max_length=100, blank=True,default='')

    description = models.CharField(max_length=100, blank=True,default='')
    parent_lo_or_org = models.CharField(max_length=100, blank=True,default='')
    work_request_approval_profile = models.CharField(max_length=100, blank=True,default='')
    owning_org = models.CharField(max_length=100, blank=True,default='')

    building = models.CharField(max_length=100, blank=True,default='')
    room = models.CharField(max_length=100, blank=True,default='')
    position = models.CharField(max_length=100, blank=True,default='')
    country = models.CharField(max_length=100, blank=True,default='')

    address_1 = models.CharField(max_length=100, blank=True,default='')
    address_2 = models.CharField(max_length=100, blank=True,default='')
    address_3 = models.CharField(max_length=100, blank=True,default='')
    cross_street = models.CharField(max_length=100, blank=True,default='')

    city = models.CharField(max_length=100, blank=True,default='')
    suburb = models.CharField(max_length=100, blank=True,default='')
    state = models.CharField(max_length=100, blank=True,default='')
    postal = models.CharField(max_length=100, blank=True,default='')

    location_class = models.CharField(max_length=100, blank=True,default='')
    main_contact = models.CharField(max_length=100, blank=True,default='')
    maintenance_manager_name = models.CharField(max_length=100, blank=True,default='')
    maintenance_manager = models.CharField(max_length=100, blank=True,default='')
    planner = models.CharField(max_length=100, blank=True,default='')

    cost_center = models.CharField(max_length=100, blank=True,default='')
    rcm_system = models.CharField(max_length=100, blank=True,default='')
    environment_rating = models.CharField(max_length=100, blank=True,default='')
    service_condition = models.CharField(max_length=100, blank=True,default='')
    duty_cycle = models.CharField(max_length=100, blank=True,default='')

    backlog_group = models.CharField(max_length=100, blank=True,default='')
    run_to_failure = models.CharField(max_length=100, blank=True,default='')
    breaker = models.CharField(max_length=100, blank=True,default='')
    runtime_source = models.CharField(max_length=100, blank=True,default='')
    tag_number = models.CharField(max_length=100, blank=True,default='')

    site_location = models.CharField(max_length=100, blank=True,default='')
    point_id = models.CharField(max_length=100, blank=True,default='')
    service_area = models.CharField(max_length=100, blank=True,default='')
    latitude = models.CharField(max_length=100, blank=True,default='')
    longitude = models.CharField(max_length=100, blank=True,default='')

    asset_critically = models.CharField(max_length=100, blank=True,default='')
    criticality_reason = models.CharField(max_length=100, blank=True,default='')
    gis_id = models.CharField(max_length=100, blank=True,default='')
    connected_to_location_id = models.CharField(max_length=100, blank=True,default='')
    water_asset_category = models.CharField(max_length=100, blank=True,default='')

    land_asset_status = models.CharField(max_length=100, blank=True,default='')
    land_ownership_number = models.CharField(max_length=100, blank=True,default='')
    take_over_date = models.DateField(null=True)
    take_over_date_source_qt11 = models.DateField(null=True)
    take_over_date_source_ccc = models.DateField(null=True)

    land_area_acre = models.CharField(max_length=100, blank=True,default='')
    plan_certified_number = models.CharField(max_length=100, blank=True,default='')
    plan_pre_computation_num = models.CharField(max_length=100, blank=True,default='')
    plan_as_built_number = models.CharField(max_length=100, blank=True,default='')

    quit_rent_bill_number = models.CharField(max_length=100, blank=True,default='')
    current_date_of_quit_rent = models.CharField(max_length=100, blank=True,default='')
    quit_rent_bill_payment_date = models.CharField(max_length=100, blank=True,default='')
    assessment_bill_number = models.CharField(max_length=100, blank=True,default='')
    
    current_rate_of_assessment = models.CharField(max_length=100, blank=True,default='')
    assessment_bill_payment_date = models.CharField(max_length=100, blank=True,default='')
    lease_expired_date = models.CharField(max_length=100, blank=True,default='')
    remarks = models.CharField(max_length=100, blank=True,default='')

    submitted_datetime = models.DateTimeField(auto_now=True)
    created_date = models.DateTimeField(auto_now_add=True)
    modified_date = models.DateTimeField(auto_now=True)
