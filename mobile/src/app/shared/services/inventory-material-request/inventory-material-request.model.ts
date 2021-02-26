export class InventoryMaterialRequestModel {
  public id: string;
  public movement_request_number: string;
  public movement_request_type: string;
  public description: string;
  public required_date: string;
  public transaction_type: string;
  public status: string;
  public source_sub_inventory: string;
  public source_locator: string;
  public destination_sub_inventory: string;
  public destination_locator: string;
  public destination_account: string;
  public line_number: string;
  public item: string;
  public requested_quantity: string;
  public uom_name: string;
  public created_by: string;

  constructor(
    id: string,
    movement_request_number: string,
    movement_request_type: string,
    description: string,
    required_date: string,
    transaction_type: string,
    status: string,
    source_sub_inventory: string,
    source_locator: string,
    destination_sub_inventory: string,
    destination_locator: string,
    destination_account: string,
    line_number: string,
    item: string,
    requested_quantity: string,
    uom_name: string,
    created_by: string
  ) {
    this.id = id;
    this.movement_request_number = movement_request_number;
    this.movement_request_type = movement_request_type;
    this.description = description;
    this.required_date = required_date;
    this.transaction_type = transaction_type;
    this.status = status;
    this.source_sub_inventory = source_sub_inventory;
    this.source_locator = source_locator;
    this.destination_sub_inventory = destination_sub_inventory;
    this.destination_locator = destination_locator;
    this.destination_account = destination_account;
    this.line_number = line_number;
    this.item = item;
    this.requested_quantity = requested_quantity;
    this.uom_name = uom_name;
    this.created_by = created_by;
  }
}
