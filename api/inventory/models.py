from __future__ import unicode_literals
import uuid

from django.contrib.gis.db import models
from django.core.validators import MaxValueValidator, MinValueValidator

from simple_history.models import HistoricalRecords

from users.models import (
    CustomUser
)

from core.helpers import PathAndRename

class InventoryItem(models.Model):

    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    record_type = models.IntegerField(blank=True, default='0')
    item_number = models.CharField(max_length=300, default='')
    inventory_org_code = models.CharField(max_length=18, default='')
    legal_entity_code = models.CharField(max_length=120, default='')
    legal_entity_me = models.CharField(max_length=960, default='')
    short_description = models.CharField(max_length=240, default='')
    long_description = models.CharField(max_length=2000, default='')
    primary_uom = models.CharField(max_length=12, default='')
    secondary_uom = models.CharField(max_length=12, default='')
    item_status = models.CharField(max_length=10, default='')
    item_category = models.CharField(max_length=1000, default='')
    inventory_item = models.CharField(max_length=1, default='')
    transfer_orders_enbled = models.CharField(max_length=1, default='')
    purchasable_item = models.CharField(max_length=1, default='')
    shippable_item = models.CharField(max_length=1, default='')

    # class meta:
    #     ordering = ['name']
    
    # def __str__(self):
    #     return self.name
    
class InventoryItemUomIntra(models.Model):

    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    record_type = models.IntegerField(blank=True, default='0')
    item_number = models.CharField(max_length=300, default='')
    from_uom_code = models.CharField(max_length=100, default='')
    uom_class = models.CharField(max_length=40, default='')
    conversion_rate = models.CharField(max_length=22, default='')
    base_uom_rate = models.CharField(max_length=100, default='')
    end_date = models.DateTimeField(auto_now=True)
    attribute1 = models.CharField(max_length=18, default='')

    # class meta:
    #     ordering = ['name']
    
    # def __str__(self):
    #     return self.name

class InventoryItemUomInter(models.Model):

    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    record_type = models.IntegerField(blank=True, default='0')
    item_number = models.CharField(max_length=300, default='')
    from_base_uom_code = models.CharField(max_length=100, default='')
    from_uom_class = models.CharField(max_length=100, default='')
    conversion_rate = models.CharField(max_length=22, default='')
    to_base_uom_code = models.CharField(max_length=100, default='')
    to_uom_class = models.CharField(max_length=40, default='')
    end_date = models.DateTimeField(auto_now=True)
    attribure1 = models.CharField(max_length=18, default='')

#     # class meta:
#     #     ordering = ['name']
    
#     # def __str__(self):
#     #     return self.name

class InventoryPurchaseOrder(models.Model):

    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    po_number = models.CharField(max_length=30, default='0')
    change_order_number = models.CharField(max_length=100, default='')
    change_order_status = models.CharField(max_length=100, default='')
    description = models.CharField(max_length=240, default='')
    procurement_bu = models.CharField(max_length=960, default='')
    sold_to_legal_entity = models.CharField(max_length=240, default='')
    buyer = models.CharField(max_length=2000, default='')
    supplier_number = models.CharField(max_length=30, default='')
    supplier_site_code = models.CharField(max_length=15, default='')
    
    address_name = models.CharField(max_length=240, default='')
    address_line_1 = models.CharField(max_length=240, default='')
    address_line_2 = models.CharField(max_length=240, default='')
    address_line_3 = models.CharField(max_length=240, default='')
    city = models.CharField(max_length=60, default='')
    state = models.CharField(max_length=60, default='')
    postal_code = models.CharField(max_length=20, default='')
    country = models.CharField(max_length=60, default='')

    contact_first_name = models.CharField(max_length=150, default='')
    contact_last_name = models.CharField(max_length=150, default='')
    contact_email_address = models.CharField(max_length=2000, default='')
    contact_mobile_number = models.CharField(max_length=60, default='')
    contact_phone_number = models.CharField(max_length=60, default='')
    supplier_contact = models.CharField(max_length=360, default='')

    line_num = models.IntegerField(blank=True, default='0')
    schedule_num = models.IntegerField(blank=True, default='0')
    distribution_num = models.IntegerField(blank=True, default='0')
    item_number = models.CharField(max_length=300, default='')

    line_description = models.CharField(max_length=240, default='')
    quantity = models.IntegerField(blank=True, default='0')
    uom_code = models.CharField(max_length=25, default='')
    base_quantity = models.IntegerField(blank=True, default='0')
    base_uom_code = models.CharField(max_length=25, default='')
    requested_date = models.DateTimeField(auto_now=True)
    ship_to_organization = models.CharField(max_length=18, default='')
    sub_inventory_code = models.CharField(max_length=10, default='')
    ship_to_location = models.CharField(max_length=60, default='')
    line_type = models.CharField(max_length=30, default='')
    line_status = models.CharField(max_length=100, default='')

#     # class meta:
#     #     ordering = ['name']
    
#     # def __str__(self):
#     #     return self.name

class InventoryGrn(models.Model):

    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    header_interface_number = models.CharField(max_length=100,blank=True, default='0')
    receipt_source_code = models.CharField(max_length=10, default='')
    business_unit = models.CharField(max_length=240, default='')
    business_type = models.CharField(max_length=240, default='')
    # transaction_type = models.CharField(max_length=25, default='')
    receipt_number = models.CharField(max_length=30, default='')
    supplier_number = models.CharField(max_length=20, default='')
    supplier_site_code = models.CharField(max_length=35, default='')
    bill_of_lading = models.CharField(max_length=25, default='')
    packing_slip = models.CharField(max_length=25, default='')
    carrier_name = models.CharField(max_length=50, default='')
    way_bill = models.CharField(max_length=20, default='')
    comments = models.CharField(max_length=240, default='')
    receiver_name = models.CharField(max_length=30, default='')
    interface_line_number = models.CharField(max_length=30, default='')
    transaction_type = models.CharField(max_length=25, default='')
    auto_transact_code = models.CharField(max_length=25, default='')
    transaction_date = models.DateTimeField(auto_now=True)
    source_document_code = models.CharField(max_length=25, default='')
    # header_interface_number = models.IntegerField(blank=True, default='0')
    organization_code = models.CharField(max_length=18, default='')
    item_number = models.CharField(max_length=300, default='')
    document_number = models.CharField(max_length=30, default='')
    document_line_number = models.CharField(max_length=18, default='')
    document_schedule_number = models.CharField(max_length=18, default='')
    document_distribution_number = models.CharField(max_length=18, default='')
    sub_inventory_code = models.CharField(max_length=10, default='')
    quantity = models.IntegerField(blank=True, default='0')
    po_line_uom = models.CharField(max_length=25, default='')
    locator = models.CharField(max_length=81, default='')
    interface_source_code = models.CharField(max_length=30, default='')

#     # class meta:
#     #     ordering = ['name']
    
#     # def __str__(self):
#     #     return self.name

class InventoryTransaction(models.Model):

    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    ORGANIZATION_CODE = models.CharField(max_length=18, default='')
    SOURCE_CODE = models.CharField(max_length=30, default='')
    SOURCE_HEADER_ID = models.IntegerField(blank=True, default='0')
    TRANSACTION_DATE = models.DateTimeField(auto_now=True)
    SOURCE_LINE_ID = models.IntegerField(blank=True, default='0')
    TRANSACTION_COST_IDENTIFIER = models.CharField(max_length=30, default='')
    ITEM_NUMBER = models.CharField(max_length=300, default='')
    SUBINVENTORY_CODE = models.CharField(max_length=10, default='')
    TRANSACTION_QUANTITY = models.IntegerField(blank=True, default='0')
    TRANSACTION_UOM = models.CharField(max_length=3, default='')
    TRANSACTION_TYPE_NAME = models.CharField(max_length=30, default='')
    TRANSACTION_REFERENCE = models.CharField(max_length=240, default='')
    USE_CURRENT_COST = models.CharField(max_length=10, default='N')
    COST_COMPONENT_CODE = models.CharField(max_length=18, default='')
    COST = models.IntegerField(blank=True, default='0')

class InventoryMaterial(models.Model):

    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    movement_request_number = models.IntegerField()
    movement_request_type = models.CharField(max_length=100, default='')
    description = models.CharField(max_length=300, default='')
    required_date = models.DateTimeField()
    transaction_type = models.CharField(max_length=100, default='')
    status = models.CharField(max_length=100, default='')
    source_sub_inventory = models.CharField(max_length=100, default='')
    source_locator = models.DateTimeField(auto_now=True)

    destination_sub_inventory = models.CharField(max_length=100, default='')
    destination_locator = models.CharField(max_length=100, default='')
    destination_account = models.CharField(max_length=100, default='')
    line_number = models.IntegerField(blank=True)
    item = models.CharField(max_length=100)
    # transaction_type = models.CharField(max_length=18, default='')
    # required_date = models.CharField(max_length=100, default='')

    requested_quantity = models.IntegerField()
    uom_name = models.CharField(max_length=100, default='')
    # status = models.CharField(max_length=100, default='')
    # source_sub_inventory = models.CharField(max_length=100, default='')
    # source_locator = models.CharField(max_length=100, default='')
    # destination_sub_inventory = models.CharField(max_length=100, default='')
    # destination_locator = models.CharField(max_length=100, default='')
    # required_date = models.DateTimeField()
    created_by = models.CharField(max_length=100, default='')
    # destination_account = models.CharField(max_length=100, default='')
