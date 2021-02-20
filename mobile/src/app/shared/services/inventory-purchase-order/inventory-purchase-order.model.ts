export class InventoryPurchaseOrderModel {
  public id: string;
  public po_number: string;
  public change_order_number: string;
  public change_order_status: string;
  public description: string;
  public procurement_bu: string;
  public sold_to_legal_entity: string;
  public buyer: string;
  public supplier_number: string;

  public supplier_site_code: string;
  public address_name: string;
  public address_line_1: string;
  public address_line_2: string;
  public address_line_3: string;
  public city: string;
  public state: string;
  public postal_code: string;

  public country: string;
  public contact_first_name: string;
  public contact_last_name: string;
  public contact_email_address: string;
  public contact_phone_number: string;
  public supplier_contact: string;
  public line_num: string;
  public schedule_num: string;

  public distribution_num: string;
  public item_number: string;
  public line_description: string;
  public quantity: string;
  public uom_code: string;
  public base_quantity: string;
  public base_uom_code: string;
  public requested_date: string;

  public ship_to_organization: string;
  public sub_inventory_code: string;
  public ship_to_location: string;
  public line_type: string;
  public line_status: string;

  constructor(
    id: string,
    po_number: string,
    change_order_number: string,
    change_order_status: string,
    description: string,
    procurement_bu: string,
    sold_to_legal_entity: string,
    buyer: string,
    supplier_number: string,

    supplier_site_code: string,
    address_name: string,
    address_line_1: string,
    address_line_2: string,
    address_line_3: string,
    city: string,
    state: string,
    postal_code: string,

    country: string,
    contact_first_name: string,
    contact_last_name: string,
    contact_email_address: string,
    contact_phone_number: string,
    supplier_contact: string,
    line_num: string,
    schedule_num: string,

    distribution_num: string,
    item_number: string,
    line_description: string,
    quantity: string,
    uom_code: string,
    base_quantity: string,
    base_uom_code: string,
    requested_date: string,

    ship_to_organization: string,
    sub_inventory_code: string,
    ship_to_location: string,
    line_type: string,
    line_status: string

  ) {
    this.id = id;
    this.po_number = po_number;
    this.change_order_number = change_order_number;
    this.change_order_status = change_order_status;
    this.description = description;
    this.procurement_bu = procurement_bu;
    this.sold_to_legal_entity = sold_to_legal_entity;
    this.buyer = buyer;
    this.supplier_number = supplier_number;

    this.supplier_site_code = supplier_site_code;
    this.address_name = address_name;
    this.address_line_1 = address_line_1;
    this.address_line_2 = address_line_2;
    this.address_line_3 = address_line_3;
    this.city = city;
    this.state = state;
    this.postal_code = postal_code;

    this.country = country;
    this.contact_first_name = contact_first_name;
    this.contact_last_name = contact_last_name;
    this.contact_email_address = contact_email_address;
    this.contact_phone_number = contact_phone_number;
    this.supplier_contact = supplier_contact;
    this.line_num = line_num;
    this.schedule_num = schedule_num;

    this.distribution_num = distribution_num;
    this.item_number = item_number;
    this.line_description = line_description;
    this.quantity = quantity;
    this.uom_code = uom_code;
    this.base_quantity = base_quantity;
    this.base_uom_code = base_uom_code;
    this.requested_date = requested_date;

    this.ship_to_organization = ship_to_organization;
    this.sub_inventory_code = sub_inventory_code;
    this.ship_to_location = ship_to_location;
    this.line_type = line_type;
    this.line_status = line_status;
  }
}
