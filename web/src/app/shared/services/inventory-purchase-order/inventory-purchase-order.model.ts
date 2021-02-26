export class InventoryPurchaseOrderModel {
  public Id: string;
  public Po_number: string;
  public Change_order_number: string;
  public Change_order_status: string;
  public Description: string;
  public Procurement_bu: string;
  public Sold_to_legal_entity: string;
  public Buyer: string;
  public Supplier_number: string;
  public Supplier_site_code: string;
  public Address_name: string;
  public Address_line_1: string;
  public Address_line_2: string;
  public Address_line_3: string;
  public City: string;
  public State: string;
  public Postal_code: string;
  public Country: string;
  public Contact_first_name: string;
  public Contact_last_name: string;
  public Contact_email_address: string;
  public Contact_mobile_number: string;
  public Contact_phone_number: string;
  public Supplier_contact: string;
  public Line_num: string;
  public Schedule_num: string;
  public Distribution_num: string;
  public Item_number: string;
  public Line_description: string;
  public Quantity: string;
  public Uom_code: string;
  public Base_quantity: string;
  public Base_uom_code: string;
  public Requested_date: string;
  public Ship_to_organization: string;
  public Sub_inventory_code: string;
  public Ship_to_location: string;
  public Line_type: string;
  public Line_status: string;

  constructor(
     Id: string,
     Po_number: string,
     Change_order_number: string,
     Change_order_status: string,
     Description: string,
     Procurement_bu: string,
     Sold_to_legal_entity: string,
     Buyer: string,
     Supplier_number: string,
     Supplier_site_code: string,
     Address_name: string,
     Address_line_1: string,
     Address_line_2: string,
     Address_line_3: string,
     City: string,
     State: string,
     Postal_code: string,
     Country: string,
     Contact_first_name: string,
     Contact_last_name: string,
     Contact_email_address: string,
     Contact_mobile_number: string,
     Contact_phone_number: string,
     Supplier_contact: string,
     Line_num: string,
     Schedule_num: string,
     Distribution_num: string,
     Item_number: string,
     Line_description: string,
     Quantity: string,
     Uom_code: string,
     Base_quantity: string,
     Base_uom_code: string,
     Requested_date: string,
     Ship_to_organization: string,
     Sub_inventory_code: string,
     Ship_to_location: string,
     Line_type: string,
     Line_status: string,
  ){
    this.Id= Id;
    this.Po_number= Po_number;
    this.Change_order_number= Change_order_number;
    this.Change_order_status= Change_order_status;
    this.Description= Description;
    this.Procurement_bu= Procurement_bu;
    this.Sold_to_legal_entity= Sold_to_legal_entity;
    this.Buyer= Buyer;
    this.Supplier_number= Supplier_number;
    this.Supplier_site_code= Supplier_site_code;
    this.Address_name= Address_name;
    this.Address_line_1= Address_line_1;
    this.Address_line_2= Address_line_2;
    this.Address_line_3= Address_line_3;
    this.City= City;
    this.State= State;
    this.Postal_code= Postal_code;
    this.Country= Country;
    this.Contact_first_name= Contact_first_name;
    this.Contact_last_name= Contact_last_name;
    this.Contact_email_address= Contact_email_address;
    this.Contact_mobile_number= Contact_mobile_number;
    this.Contact_phone_number= Contact_phone_number;
    this.Supplier_contact= Supplier_contact;
    this.Line_num= Line_num;
    this.Schedule_num= Schedule_num;
    this.Distribution_num= Distribution_num;
    this.Item_number= Item_number;
    this.Line_description= Line_description;
    this.Quantity= Quantity;
    this.Uom_code= Uom_code;
    this.Base_quantity= Base_quantity;
    this.Base_uom_code= Base_uom_code;
    this.Requested_date= Requested_date;
    this.Ship_to_organization= Ship_to_organization;
    this.Sub_inventory_code= Sub_inventory_code;
    this.Ship_to_location= Ship_to_location;
    this.Line_type= Line_type
    this.Line_status= Line_status;
  }
}
