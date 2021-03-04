export class InventoryItemUomIntra {
  public id: string;
  public record_type: string;
  public item_number: string;
  public from_uom_class: string;
  public uom_class: string;
  public convertion_rate: string;
  public base_uom_rate: string;
  public end_date: string;
  public attribute1: string;

  constructor(
     id: string,
     record_type: string,
     item_number: string,
     from_uom_class: string,
     uom_class: string,
     convertion_rate: string,
     base_uom_rate: string,
     end_date: string,
     attribute1: string,
  ){
    this.id = id;
    this.record_type= record_type;
    this.item_number= item_number;
    this.from_uom_class= from_uom_class;
    this.uom_class= uom_class;
    this.convertion_rate= convertion_rate;
    this.base_uom_rate= base_uom_rate;
    this.end_date= end_date;
    this.attribute1= attribute1;
  }
}
