export class InventoryItemInterModel {
  public id: string;
  public record_type: string;
  public item_number: string;
  public from_uom_code: string;
  public uom_class: string;
  public conversion_rate: string;
  public base_uom_rate: string;
  public end_date: string;
  public attribute1: string;

  constructor(
    id: string,
    record_type: string,
    item_number: string,
    from_uom_code: string,
    uom_class: string,
    conversion_rate: string,
    base_uom_rate: string,
    end_date: string,
    attribute1: string
  ) {
    this.id = id;
    this.record_type = record_type;
    this.item_number = item_number;
    this.from_uom_code = from_uom_code;
    this.uom_class = uom_class;
    this.conversion_rate = conversion_rate;
    this.base_uom_rate = base_uom_rate;
    this.end_date = end_date;
    this.attribute1 = attribute1;
  }
}
