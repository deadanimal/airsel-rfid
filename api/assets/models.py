# -*- coding: utf-8 -*-
from __future__ import unicode_literals
import uuid

from django.contrib.gis.db import models
from django.core.validators import MaxValueValidator, MinValueValidator

from simple_history.models import HistoricalRecords

from locations.models import (
    Region
)

from organisations.models import (
    Organisation
)

from users.models import (
    CustomUser
)

from core.helpers import PathAndRename

class Asset(models.Model):

    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    name = models.CharField(max_length=100, default='NA')
    purchased_at = models.DateTimeField(null=True, blank=True)
    is_active = models.BooleanField(default=True)
    
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
    owned_department = models.CharField(
        max_length=2,
        choices=DEPARTMENT,
        default='NA'
    )

    HIERARCHY_LEVEL_1 = [
        ('CB', 'Customer Billing Services'),
        ('DB', 'Distribution'),
        ('FL', 'Fleet'),
        ('GA', 'General Admin'),
        ('PD', 'Production'),
        ('SD', 'SCADA'),
        ('WQ', 'Water Quality'),
        ('NA', ' Not Available')
    ]
    hierarchy_level_1 = models.CharField(
        max_length=2,
        choices=HIERARCHY_LEVEL_1,
        default='NA'
    )
    hierarchy_level_2 = models.ForeignKey(Region, on_delete=models.CASCADE, null=True, related_name='assets_hierarchy_level_2')

    HIERARCHY_LEVEL_3 = [
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
    hierarchy_level_3 = models.CharField(
        max_length=2,
        choices=HIERARCHY_LEVEL_3,
        default='NA'
    )

    HIERARCHY_LEVEL_4 = [
        ('NR', 'NRW'),
        ('PH', 'Pump House'),
        ('RS', 'Reservoir'),
        ('TP', 'Treatment Plant Name'),
        ('NA', ' Not Available')
    ]
    hierarchy_level_4 = models.CharField(
        max_length=2,
        choices=HIERARCHY_LEVEL_4,
        default='NA'
    )

    HIERARCHY_LEVEL_5 = [
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
    hierarchy_level_5 = models.CharField(
        max_length=2,
        choices=HIERARCHY_LEVEL_5,
        default='NA'
    )

    HIERARCHY_LEVEL_6 = [
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
    hierarchy_level_6 = models.CharField(
        max_length=2,
        choices=HIERARCHY_LEVEL_6,
        default='NA'
    )

    TYPE_ASSET = [
        ('AS', 'Asset'),
        ('CP', 'Component'),
        ('NA', 'Not Available')
    ]
    type_asset = models.CharField(
        max_length=2,
        choices=TYPE_ASSET,
        default='NA'
    )

    CATEGORY = [
        ('EL', 'Electrical'),
        ('MC', 'Mechanical'),
        ('IS', 'Insturement'),
        ('OT', 'Other')
    ]
    category = models.CharField(
        max_length=2,
        choices=CATEGORY,
        default='OT'
    )
    category_extra = models.CharField(max_length=100, null=True, blank=True)

    is_hand_over = models.BooleanField(default=False)
    is_procured = models.BooleanField(default=False)

    INTERNAL_DETAIL_IDENTITY = [
        ('P1', 'Pump-1'),
        ('P2', 'Pump-2'),
        ('M1', 'Motor-1'),
        ('M2', 'Motor-2'),
        ('NA', 'Not Available')
    ]
    internal_detail_indentity = models.CharField(
        max_length=2,
        choices=INTERNAL_DETAIL_IDENTITY,
        default='NA'
    )

    PRIMARY_CATEGORY = [
        ('BV', 'Butterfly Valve'),
        ('CA', 'Chain Block'),
        ('CE', 'Check Valve'),
        ('HT', 'Hydropneumatic Tank'),
        ('MS', 'Main Switchboard'),
        ('MT', 'Motor'),
        ('PG', 'Presuure Gauge'),
        ('PP', 'Pump'),
        ('SV', 'Sluice Valve'),
        ('SA', 'Surge Anticipating Valve'),
        ('NA', 'Not Available')
    ]
    primary_category = models.CharField(
        max_length=2,
        choices=PRIMARY_CATEGORY,
        default='NA'
    )

    GROUPING_SUB_CATEGORY_1 = [
        ('AR', 'Air Receiver Tank'),
        ('DL', 'Delivery'),
        ('HR', 'Horizontal'),
        ('MP', 'Main Power Suppply'),
        ('MN', 'Manual'),
        ('OF', 'Oil Filled'),
        ('ST', 'Suction'),
        ('VT', 'Vertical'),
        ('NA', 'Not Available')
    ]
    grouping_sub_category_1 = models.CharField(
        max_length=2,
        choices=GROUPING_SUB_CATEGORY_1,
        default='NA'
    )
    
    GROUPING_SUB_CATEGORY_2 = [
        ('CS', 'Casing'),
        ('DL', 'Delivery'),
        ('DF', 'Double Flange Swing'),
        ('EL', 'Electrical Installation'),
        ('ES', 'End Suction'),
        ('MS', 'Multi Stage'),
        ('RP', 'Reduced Port'),
        ('SP', 'Split'),
        ('SC', 'Squirrel Cage'),
        ('ST', 'Suction'),
        ('VT', 'Vertical'),
        ('WT', 'Wafer Twin Door'),
        ('NA', 'Not Available')
    ]
    grouping_sub_category_2 = models.CharField(
        max_length=2,
        choices=GROUPING_SUB_CATEGORY_2,
        default='NA'
    )
    
    brand = models.CharField(max_length=100, default='NA')
    model_no = models.CharField(max_length=100, default='NA')

    msize_capcity_1 = models.IntegerField(default=0)
    msize_capcity_1_measurement = models.IntegerField(default=0)
    msize_capcity_2 = models.IntegerField(default=0)
    msize_capcity_2_measurement = models.IntegerField(default=0)
    msize_capcity_3 = models.IntegerField(default=0)

    msize_capcity_3_measurement = models.IntegerField(default=0)
    parent_plate_number = models.CharField(max_length=100, default='NA')
    plate_number = models.CharField(max_length=100, default='NA')
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

    # supervisor = models.ForeignKey(CustomUser, on_delete=models.CASCADE, null=True)

    created_at = models.DateTimeField(auto_now_add=True)
    modified_at = models.DateTimeField(auto_now=True)

    class meta:
        ordering = ['name']
    
    def __str__(self):
        return self.name
