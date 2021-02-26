export class InventoryItemModel {
  public id: string;
  public record_type: string;
  public item_number: string;
  public inventory_org_code: string;
  public legal_entity_code: string;
  public legal_entity_me: string;
  public short_description: string;
  public long_description: string;
  public primary_uom: string;
  public secondary_uom: string;
  public item_status: string;
  public item_category: string;
  public inventory_item: string;
  public transfer_orders_enbled: string;
  public purchasable_item: string;
  public shippable_item: string;

  constructor(
    id: string,
    record_type: string,
    item_number: string,
    inventory_org_code: string,
    legal_entity_code: string,
    legal_entity_me: string,
    short_description: string,
    long_description: string,
    primary_uom: string,
    secondary_uom: string,
    item_status: string,
    item_category: string,
    inventory_item: string,
    transfer_orders_enbled: string,
    purchasable_item: string,
    shippable_item: string
  ) {
    this.id = id;
    this.record_type = record_type;
    this.item_number = item_number;
    this.inventory_org_code = inventory_org_code;
    this.legal_entity_code = legal_entity_code;
    this.legal_entity_me = legal_entity_me;
    this.short_description = short_description;
    this.long_description = long_description;
    this.primary_uom = primary_uom;
    this.secondary_uom = secondary_uom;
    this.item_status = item_status;
    this.item_category = item_category;
    this.inventory_item = inventory_item;
    this.transfer_orders_enbled = transfer_orders_enbled;
    this.purchasable_item = purchasable_item;
    this.shippable_item = shippable_item;
  }
}
