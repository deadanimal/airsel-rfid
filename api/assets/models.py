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


class Asset(models.Model):

    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    name = models.CharField(max_length=100, default='NA')
    wams_asset_id = models.CharField(max_length=100, default='NA')
    rfid = models.ForeignKey(
        Rfid,
        on_delete=models.CASCADE,
        null=True,
        related_name='asset_rfid'
    )
    qrcode = models.CharField(max_length=100, default='NA')
    purchased_at = models.DateTimeField(null=True, blank=True)
    is_active = models.BooleanField(default=True)
    
    badge_number = models.CharField(max_length=100, default='NA')
    DEPARTMENT = [
        ('CB', 'Customer Billing Services'),
        ('DB', 'Distribution'),
        ('ED', 'Engineering Services - Distribution'),
        ('FL', 'Fleet'),
        ('LN', 'Land'),
        ('NR', 'NRW'),
        ('PN', 'Production Northern'),
        ('PS', 'Production Southern'),
        ('SD', 'SCADA'),
        ('WQ', 'Water Quality'),
        ('NA', ' Not Available')
    ]
    owning_department = models.CharField(
        max_length=2,
        choices=DEPARTMENT,
        default='NA'
    )

    LEVEL_1 = [
        ('CB', 'Customer Billing Services'),
        ('DB', 'Distribution'),
        ('FL', 'Fleet'),
        ('GA', 'General Admin'),
        ('PD', 'Production'),
        ('SD', 'SCADA'),
        ('WQ', 'Water Quality'),
        ('NA', ' Not Available')
    ]
    level_1 = models.CharField(
        max_length=2,
        choices=LEVEL_1,
        default='NA'
    )
    level_2 = models.ForeignKey(
        Region,
        on_delete=models.CASCADE,
        null=True,
        related_name='assets_level_2'
    )

    LEVEL_3 = [
        ('ND', 'NRW - District Metering Zone'),
        ('NT', 'NRW - Transmission Network'),
        ('NW', 'NRW - Water Balancing Area'),
        ('PH', 'Pump House'),
        ('RS', 'Reservoir'),
        ('VD', 'Valve - Distribution Main'),
        ('VT', 'Valve - Trunk Main'),
        ('WT', 'Water Treatment Plant'),
        ('WL', 'WQ Laboratory Services'),
        ('WO', 'WQ - Online Analyzer'),
        ('WR', 'WQ - River Monitoring Station'),
        ('WS', 'WQ Sampling Station'),
        ('NA', ' Not Available')
    ]
    level_3 = models.CharField(
        max_length=2,
        choices=LEVEL_3,
        default='NA'
    )

    level_4 = models.CharField(max_length=100, default='NA')

    LEVEL_5 = [
        ('AS', 'Aeration System'),
        ('BR', 'Balancing Reservoir'),
        ('BD', 'Buildings'),
        ('CD', 'Chemical Dosing'),
        ('CS', 'Coagulation System'),
        ('DT', 'Draw of Tower'),
        ('ES', 'Earthing System'),
        ('EP', 'Electrical Panel'),
        ('ES', 'Electrical System'),
        ('FS', 'Filtration Process'),
        ('FC', 'Flocculation'),
        ('OR', 'Off River Storage Reservoir'),
        ('RW', 'Raw Water Process'),
        ('SP', 'Sedimentation Process'),
        ('SS', 'Solar System'),
        ('ST', 'Sludge Treament Process'),
        ('SW', 'Settled Water Process'),
        ('TI', 'Tangki Imbang 3MG'),
        ('TO', 'Tangki Imbangan 4MG (OLD)'),
        ('TN', 'Tangki Imbangan 4MG (NEW)'),
        ('TS', 'Telemetry System'),
        ('TP', 'Treatment Process'),
        ('TW', 'Treated Water Process'),
        ('WA', 'Water Analysis'),
        ('NA', ' Not Available')
    ]
    level_5 = models.CharField(
        max_length=2,
        choices=LEVEL_5,
        default='NA'
    )

    LEVEL_6 = [
        ('AP', 'Actiflo Process'),
        ('AC', 'Activated Carbon Process'),
        ('AS', 'Aeration System'),
        ('ES', 'Alum Process'),
        ('BP', 'Backwash Process'),
        ('BR', 'Balancing Reservoir'),
        ('BO', 'Boat House'),
        ('BU', 'Buildings'),
        ('CD', 'Chemical Dosing'),
        ('CM', 'Chemical Process'),
        ('CP', 'Chlorination Process'),
        ('CO', 'Coagulation Process'),
        ('CR', 'Chemical Room'),
        ('CC', 'Control Centre'),
        ('CR', 'Control Room'),
        ('DP', 'Data Process'),
        ('DS', 'Distrafication'),
        ('DO', 'Draw Off Process'),
        ('ES', 'Earthing System'),
        ('EL', 'Electrical System'),
        ('FS', 'Facilities System'),
        ('FP', 'Filtration Process'),
        ('FW', 'Filtered Water Sampling'),
        ('FO', 'Flocculation Process'),
        ('FL', 'Fluoride Process'),
        ('LB', 'Laboratory'),
        ('LP', 'Lime Process'),
        ('OA', 'Online Analyzer'),
        ('PR', 'Polymer (Residual) Dosing'),
        ('PA', 'Poly Aluminium Chloride Process'),
        ('PP', 'Polymer Process'),
        ('PS', 'Power Supply'),
        ('RM', 'Rapid Mixing'),
        ('RE', 'Residual Emergency Lagoon'),
        ('RT', 'Residual Thickened Pumping Station'),
        ('RI', 'Raw Water Intake System'),
        ('RS', 'Raw Water Pumping System'),
        ('RP', 'Raw Water Process'),
        ('RE', 'Raw Water Pipeline'),
        ('RV', 'Reservoir'),
        ('SS', 'SCADA System'),
        ('SD', 'Sedimentation Process'),
        ('SL', 'Settled Water Process'),
        ('SS', 'Settled Water Sampling'),
        ('SW', 'Settled Water Pumping System'),
        ('SB', 'Sludge Balancing'),
        ('ST', 'Sludge Treament Process'),
        ('SQ', 'Solid Liquid Separation'),
        ('SA', 'Solar System'),
        ('SI', 'Sodium Alumino Silicate Process'),
        ('SO', 'Soda Ash Process'),
        ('TA', 'Tangki Sedit SYABAS'),
        ('TE', 'Telemetry System'),
        ('TP', 'Treated Water Process'),
        ('TS', 'Treated Water Sampling'),
        ('TL', 'Treated Water Pipeline'),
        ('TW', 'Treated Water Pumping System'),
        ('TT', 'Treatment Process'),
        ('WA', 'Water Analysis'),
        ('WO', 'Workshop'),
        ('WT', 'Water Transfer'),
        ('WP', 'Wash Water Process'),
        ('WR', 'Wash Water Recovery'),
        ('WS', 'Wash Water System'),
        ('NA', ' Not Available')
    ]
    level_6 = models.CharField(
        max_length=2,
        choices=LEVEL_6,
        default='NA'
    )

    primary_category = models.ForeignKey(
        AssetType,
        on_delete=models.CASCADE,
        null=True,
        related_name='asset_primary_category',
        limit_choices_to={
            'category': 'AT'
        }
    )

    identity = models.ForeignKey(
        AssetGroup,
        on_delete=models.CASCADE,
        null=True,
        related_name='asset_identity',
        limit_choices_to={
            'category': 'AI'
        }
    )

    sub_category_1 = models.CharField(max_length=100, blank=True, default='NA')
    sub_category_2 = models.CharField(max_length=100, blank=True, default='NA')

    asset_description = models.CharField(max_length=100, default='NA')
    type_asset = models.ForeignKey(
        AssetType,
        on_delete=models.CASCADE,
        null=True,
        related_name='asset_type',
        limit_choices_to={
            'category': 'AC'
        }
    )

    category = models.ForeignKey(
        AssetType,
        on_delete=models.CASCADE,
        null=True,
        related_name='asset_category',
        limit_choices_to={
            'category': 'AG'
        }
    )

    ACQUIRED_BY = [
        ('AH', 'Asset Handover'),
        ('PC', 'Procured')
    ]
    acquired_by = models.CharField(
        max_length=2,
        choices=ACQUIRED_BY,
        default='AH'
    )
    
    brand = models.CharField(max_length=100, default='NA')
    model_no = models.CharField(max_length=100, default='NA')

    size_capacity_1 = models.FloatField(default=0)
    size_capacity_1_measurement = models.FloatField(default=0)
    size_capacity_2 = models.FloatField(default=0)
    size_capacity_2_measurement = models.FloatField(default=0)
    size_capacity_3 = models.FloatField(default=0)
    size_capacity_3_measurement = models.FloatField(default=0)
    
    parent_plate_number = models.CharField(max_length=100, default='NA')
    plate_number = models.CharField(max_length=100, default='NA')
    serial_number = models.CharField(max_length=100, default='NA')
    vendor_part_no = models.CharField(max_length=100, default='NA')
    scada_id = models.CharField(max_length=100, default='NA')
    external_id = models.CharField(max_length=100, default='NA')
    tag_number = models.CharField(max_length=100, default='NA')
    pallet_number = models.CharField(max_length=100, default='NA')
    installed_at = models.DateTimeField(null=True)

    RATING = [
        ('1', '1 - Very Good'),
        ('2', '2 - Good'),
        ('3', '3 - Average'),
        ('4', '4 - Popover'),
        ('5', '5 - Replace')
    ]
    rating = models.CharField(
        max_length=1,
        choices=RATING,
        default='3'
    )

    STATUS = [
        ('NA', 'Not Available')
    ]
    status = models.CharField(
        max_length=2,
        choices=STATUS,
        default='NA'
    )

    maintenance_specification = models.CharField(max_length=100, default='NA')
    bill_of_material = models.CharField(max_length=100, default='NA')

    MEASURING_TYPE = [
        ('FM', 'Flow Meter Readings'),
        ('TP', 'Temperature'),
        ('OT', 'Other')
    ]
    measuring_type = models.CharField(
        max_length=2,
        choices=MEASURING_TYPE,
        default='OT'
    )

    is_warranty = models.BooleanField(default=False)
    warranty_period_actual = models.IntegerField(default=0)
    warranty_vendor = models.ForeignKey(Organisation, on_delete=models.CASCADE, null=True, related_name='asset_warranty_vendor')
    po_vendor = models.ForeignKey(Organisation, on_delete=models.CASCADE, null=True, related_name='asset_po_vendor')
    po_cost = models.IntegerField(default=1)
    location = models.ForeignKey(
        Location,
        on_delete=models.CASCADE,
        null=True,
        related_name='asset_location'
    )
    created_by = models.ForeignKey(
        CustomUser,
        on_delete=models.CASCADE,
        null=True,
        related_name='asset_created_by'
    )
    modified_by = models.ForeignKey(
        CustomUser,
        on_delete=models.CASCADE,
        null=True,
        related_name='asset_modified_by'
    )

    #Approval
    APPROVAL_STATUS = [
        ('AP', 'Approve'),
        ('RE', 'Reject'),
        ('NA', 'Not Available')
    ]
    approval_status = models.CharField(
        max_length=2,
        choices=APPROVAL_STATUS,
        default='NA'
    )
    approval_by = models.ForeignKey(
        CustomUser,
        on_delete=models.CASCADE,
        null=True,
        related_name='asset_approval_by'
    )
    approval_at = models.DateTimeField(null=True, blank=True)
    reject_remark = models.CharField(max_length=100, default='NA')

    created_at = models.DateTimeField(auto_now_add=True)
    modified_at = models.DateTimeField(auto_now=True)

    class meta:
        ordering = ['name']
    
    def __str__(self):
        return self.name


class AssetRegistration(models.Model):

    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    asset_id = models.CharField(max_length=200, default='NA',null=True, blank=True)
    badge_no = models.CharField(max_length=100, default='NA',null=True, blank=True)
    node_id = models.CharField(max_length=200, default='NA',null=True, blank=True)
    hex_code = models.CharField(max_length=200, default='NA',null=True, blank=True)
    asset_identity = models.CharField(max_length=200, default='NA',null=True, blank=True)
    parent_location = models.CharField(max_length=200, default='NA',null=True, blank=True)
    location_description = models.CharField(max_length=200, default='NA',null=True, blank=True)
    building = models.CharField(max_length=200, default='NA',null=True, blank=True)
    address_line_1 = models.CharField(max_length=200, default='NA',null=True, blank=True)
    address_line_2 = models.CharField(max_length=200, default='NA',null=True, blank=True)
    address_line_3 = models.CharField(max_length=200, default='NA',null=True, blank=True)
    city = models.CharField(max_length=200, default='NA',null=True, blank=True)
    state = models.CharField(max_length=200, default='NA',null=True, blank=True)
    postal_code = models.CharField(max_length=200, default='NA',null=True, blank=True)
    country = models.CharField(max_length=200, default='NA',null=True, blank=True)
    tag_number = models.CharField(max_length=200, default='NA',null=True, blank=True)
    service_area = models.CharField(max_length=200, default='NA',null=True, blank=True)
    location_main_contact = models.CharField(max_length=200, default='NA',null=True, blank=True)
    location_asset_maintenance_manager = models.CharField(max_length=200, default='NA',null=True, blank=True)
    maintenance_planner = models.CharField(max_length=200, default='NA',null=True, blank=True)
    gis_esri_id = models.CharField(max_length=200, default='NA',null=True, blank=True)
    latitude = models.CharField(max_length=200, default='NA',null=True, blank=True)
    longitude = models.CharField(max_length=200, default='NA',null=True, blank=True)
    asset_critically = models.CharField(max_length=200, default='NA',null=True, blank=True)
    cost_center = models.CharField(max_length=200, default='NA',null=True, blank=True)
    asset_owning_department = models.CharField(max_length=200, default='NA',null=True, blank=True)
    main_operation = models.CharField(max_length=200, default='NA',null=True, blank=True)
    region = models.CharField(max_length=200, default='NA',null=True, blank=True)
    operation = models.CharField(max_length=200, default='NA',null=True, blank=True)
    process_function = models.CharField(max_length=200, default='NA',null=True, blank=True)
    sub_process_system = models.CharField(max_length=200, default='NA',null=True, blank=True)
    asset_or_component_type = models.CharField(max_length=200, default='NA',null=True, blank=True)
    asset_class_asset_category = models.CharField(max_length=200, default='NA',null=True, blank=True)
    handed_over_asset_or_procured = models.CharField(max_length=200, default='NA',null=True, blank=True)
    internal_asset_adentity = models.CharField(max_length=200, default='NA',null=True, blank=True)
    asset_primary_category = models.CharField(max_length=200, default='NA',null=True, blank=True)
    sub_category_1 = models.CharField(max_length=200, default='NA',null=True, blank=True)
    sub_category_2 = models.CharField(max_length=200, default='NA',null=True, blank=True)
    brand = models.CharField(max_length=200, default='NA',null=True, blank=True)
    model_number = models.CharField(max_length=200, default='NA',null=True, blank=True)
    size_capacity_1 = models.CharField(max_length=200, default='NA',null=True, blank=True)
    size_capacity_1_unit_measurement = models.CharField(max_length=200, default='NA',null=True, blank=True)
    size_capacity_2 = models.CharField(max_length=200, default='NA',null=True, blank=True)
    size_capacity_2_unit_measurement = models.CharField(max_length=200, default='NA',null=True, blank=True)
    size_capacity_3 = models.CharField(max_length=200, default='NA',null=True, blank=True)
    size_capacity_3_unit_measurement = models.CharField(max_length=200, default='NA',null=True, blank=True)
    parent_asset_plate_number = models.CharField(max_length=200, default='NA',null=True, blank=True)
    asset_plate_number = models.CharField(max_length=200, default='NA',null=True, blank=True)
    detailed_description = models.CharField(max_length=200, default='NA',null=True, blank=True)
    serial_number = models.CharField(max_length=200, default='NA',null=True, blank=True)
    asset_tag_number = models.CharField(max_length=200, default='NA',null=True, blank=True)
    purchase_date_installed_handed_over_date = models.CharField(max_length=200, default='NA',null=True, blank=True)
    condition_rating = models.CharField(max_length=200, default='NA',null=True, blank=True)
    status = models.CharField(max_length=200, default='NA',null=True, blank=True)
    maintenance_specification = models.CharField(max_length=200, default='NA',null=True, blank=True)
    measurement_type = models.CharField(max_length=200, default='NA',null=True, blank=True)
    warranty = models.CharField(max_length=200, default='NA',null=True, blank=True)
    actual_warranty_period = models.CharField(max_length=200, default='NA',null=True, blank=True)
    warranty_vendor_name = models.CharField(max_length=200, default='NA',null=True, blank=True)
    bottom_water_level = models.CharField(max_length=200, default='NA',null=True, blank=True)
    closing_torque = models.CharField(max_length=200, default='NA',null=True, blank=True)
    dimention = models.CharField(max_length=200, default='NA',null=True, blank=True)
    frequency = models.CharField(max_length=200, default='NA',null=True, blank=True)
    infrastructure_status = models.CharField(max_length=200, default='NA',null=True, blank=True)
    installation = models.CharField(max_length=200, default='NA',null=True, blank=True)
    manufacturer = models.CharField(max_length=200, default='NA',null=True, blank=True)
    material_type = models.CharField(max_length=200, default='NA',null=True, blank=True)
    no_of_channel = models.CharField(max_length=200, default='NA',null=True, blank=True)
    opening_torque = models.CharField(max_length=200, default='NA',null=True, blank=True)
    pump_head = models.CharField(max_length=200, default='NA',null=True, blank=True)
    staging_height = models.CharField(max_length=200, default='NA',null=True, blank=True)
    top_water_level = models.CharField(max_length=200, default='NA',null=True, blank=True)
    valve_pressure_rating = models.CharField(max_length=200, default='NA',null=True, blank=True)
    vehicle_engine_number = models.CharField(max_length=200, default='NA',null=True, blank=True)
    vehicle_insurance_auto_windscreen_insured = models.CharField(max_length=200, default='NA',null=True, blank=True)
    vehicle_insurance_date_period_to = models.CharField(max_length=200, default='NA',null=True, blank=True)
    vehicle_insurance_sum_insured = models.CharField(max_length=200, default='NA',null=True, blank=True)
    vehicle_owner_status = models.CharField(max_length=200, default='NA',null=True, blank=True)
    vehicle_puspakom_expired_date = models.CharField(max_length=200, default='NA',null=True, blank=True)
    vehicle_roadtax_expired_date = models.CharField(max_length=200, default='NA',null=True, blank=True)
    vehicle_seating_capacity = models.CharField(max_length=200, default='NA',null=True, blank=True)
    communication_protocol = models.CharField(max_length=200, default='NA',null=True, blank=True)
    environmental_performance = models.CharField(max_length=200, default='NA',null=True, blank=True)
    horse_power = models.CharField(max_length=200, default='NA',null=True, blank=True)
    infrastructure_status_reason = models.CharField(max_length=200, default='NA',null=True, blank=True)
    insulation = models.CharField(max_length=200, default='NA',null=True, blank=True)
    manufacturer_year = models.CharField(max_length=200, default='NA',null=True, blank=True)
    model = models.CharField(max_length=200, default='NA',null=True, blank=True)
    no_of_phases = models.CharField(max_length=200, default='NA',null=True, blank=True)
    outlet_diameter = models.CharField(max_length=200, default='NA',null=True, blank=True)
    revolutions_per_minute = models.CharField(max_length=200, default='NA',null=True, blank=True)
    supply_location = models.CharField(max_length=200, default='NA',null=True, blank=True)
    type = models.CharField(max_length=200, default='NA',null=True, blank=True)
    vehicle_chasis_number = models.CharField(max_length=200, default='NA',null=True, blank=True)
    vehicle_insurance_vendor = models.CharField(max_length=200, default='NA',null=True, blank=True)
    vehicle_insurance_cover_note_number = models.CharField(max_length=200, default='NA',null=True, blank=True)
    vehicle_insurance_no_claim_discount = models.CharField(max_length=200, default='NA',null=True, blank=True)
    vehicle_insurance_total_premium = models.CharField(max_length=200, default='NA',null=True, blank=True)
    vehicle_register_date = models.CharField(max_length=200, default='NA',null=True, blank=True)
    vehicle_spad_permit_date_period_to = models.CharField(max_length=200, default='NA',null=True, blank=True)
    vehicle_spad_no_license_operator = models.CharField(max_length=200, default='NA',null=True, blank=True)
    vehicle_registration_owner = models.CharField(max_length=200, default='NA',null=True, blank=True)
    capacity_size = models.CharField(max_length=200, default='NA',null=True, blank=True)
    coverage_range = models.CharField(max_length=200, default='NA',null=True, blank=True)
    flow_rate = models.CharField(max_length=200, default='NA',null=True, blank=True)
    hysteresis = models.CharField(max_length=200, default='NA',null=True, blank=True)
    inlet_diameter = models.CharField(max_length=200, default='NA',null=True, blank=True)
    legal_name = models.CharField(max_length=200, default='NA',null=True, blank=True)
    manufacture_part_number = models.CharField(max_length=200, default='NA',null=True, blank=True)
    motor_current = models.CharField(max_length=200, default='NA',null=True, blank=True)
    no_of_stage = models.CharField(max_length=200, default='NA',null=True, blank=True)
    power_supply_type = models.CharField(max_length=200, default='NA',null=True, blank=True)
    source_from = models.CharField(max_length=200, default='NA',null=True, blank=True)
    temperature = models.CharField(max_length=200, default='NA',null=True, blank=True)
    valve_diameter = models.CharField(max_length=200, default='NA',null=True, blank=True)
    vehicle_engine_capacity = models.CharField(max_length=200, default='NA',null=True, blank=True)
    vehicle_model = models.CharField(max_length=200, default='NA',null=True, blank=True)
    vehicle_insurance_date_period_from = models.CharField(max_length=200, default='NA',null=True, blank=True)
    vehicle_insurance_policy_type = models.CharField(max_length=200, default='NA',null=True, blank=True)
    vehicle_puspakom_date_inspection = models.CharField(max_length=200, default='NA',null=True, blank=True)
    vehicle_roadtarate = models.CharField(max_length=200, default='NA',null=True, blank=True)
    vehicle_roadtax_renew_date = models.CharField(max_length=200, default='NA',null=True, blank=True)
    vehicle_spad_permit_date_period_from = models.CharField(max_length=200, default='NA',null=True, blank=True)
    voltage = models.CharField(max_length=200, default='NA',null=True, blank=True)
    asset_status = models.CharField(max_length=200, default='NA',null=True, blank=True)

    #Approval
    APPROVAL_STATUS = [
        ('CO', 'Completed'),
        ('IC','Incomplete'),
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

