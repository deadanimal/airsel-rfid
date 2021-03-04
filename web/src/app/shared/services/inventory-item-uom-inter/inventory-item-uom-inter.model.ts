export class InventoryItemUomInter {
  public id: string;
  public record_type: string;
  public item_number: string;
  public from_base_uom_code: string;
  public from_uom_class: string;
  public convertion_rate: string;
  public to_base_uom_code: string;
  public to_uom_class: string;
  public end_date: string;
  public attribute1: string;

  constructor(
     id: string,
     record_type: string,
     item_number: string,
     from_base_uom_code: string,
     from_uom_class: string,
     convertion_rate: string,
     to_base_uom_code: string,
     to_uom_class: string,
     end_date: string,
     attribute1: string,
  ){
    this.id= id;
    this.record_type= record_type;
    this.item_number= item_number;
    this.from_base_uom_code= from_base_uom_code;
    this.from_uom_class= from_uom_class;
    this.convertion_rate= convertion_rate;
    this.to_base_uom_code= to_base_uom_code;
    this.to_uom_class= to_uom_class;
    this.end_date= end_date;
    this.attribute1= attribute1;
  }
}
