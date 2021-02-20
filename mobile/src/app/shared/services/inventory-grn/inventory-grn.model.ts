export class InventoryGrnModel {
  public id: string;
  public header_interface_number: string;
  public receipt_source_code: string;
  public business_unit: string;
  public business_type: string;
  public receipt_number: string;
  public supplier_number: string;

  public supplier_site_code: string;
  public bill_of_lading: string;
  public packing_slip: string;
  public carrier_name: string;
  public way_bill: string;
  public comments: string;
  public receiver_name: string;

  public interface_line_number: string;
  public transaction_type: string;
  public auto_transact_code: string;
  public transaction_date: string;
  public source_document_code: string;
  public organization_code: string;
  public item_number: string;
  public document_number: string;

  public document_line_number: string;
  public document_schedule_number: string;
  public document_distribution_number: string;
  public sub_inventory_code: string;
  public quantity: string;
  public po_line_uom: string;
  public locator: string;
  public interface_source_code: string;

  constructor(
    id: string,
    header_interface_number: string,
    receipt_source_code: string,
    business_unit: string,
    business_type: string,
    receipt_number: string,
    supplier_number: string,

    supplier_site_code: string,
    bill_of_lading: string,
    packing_slip: string,
    carrier_name: string,
    way_bill: string,
    comments: string,
    receiver_name: string,

    interface_line_number: string,
    transaction_type: string,
    auto_transact_code: string,
    transaction_date: string,
    source_document_code: string,
    organization_code: string,
    item_number: string,
    document_number: string,

    document_line_number: string,
    document_schedule_number: string,
    document_distribution_number: string,
    sub_inventory_code: string,
    quantity: string,
    po_line_uom: string,
    locator: string,
    interface_source_code: string,

  ) {
    this.id = id;
    this.header_interface_number = header_interface_number;
    this.receipt_source_code = receipt_source_code;
    this.business_unit = business_unit;
    this.business_type = business_type;
    this.receipt_number = receipt_number;
    this.supplier_number = supplier_number;

    this.supplier_site_code = supplier_site_code;
    this.bill_of_lading = bill_of_lading;
    this.packing_slip = packing_slip;
    this.carrier_name = carrier_name;
    this.way_bill = way_bill;
    this.comments = comments;
    this.receiver_name = receiver_name;

    this.interface_line_number = interface_line_number;
    this.transaction_type = transaction_type;
    this.auto_transact_code = auto_transact_code;
    this.transaction_date = transaction_date;
    this.source_document_code = source_document_code;
    this.organization_code = organization_code;
    this.item_number = item_number;
    this.document_number = document_number;

    this.document_line_number = document_line_number;
    this.document_schedule_number = document_schedule_number;
    this.document_distribution_number = document_distribution_number;
    this.sub_inventory_code = sub_inventory_code;
    this.quantity = quantity;
    this.po_line_uom = po_line_uom;
    this.locator = locator;
    this.interface_source_code = interface_source_code;
  }
}
