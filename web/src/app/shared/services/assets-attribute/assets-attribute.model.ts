export class AssetsAttributeModel {
  public id: string;
  public characteristic_type: string;
  public adhoc_value: string;
  public characteristic_value: string;
  public characteristic_type_name: string;
  public created_date: string;
  public modified_date: string;
  constructor(
    id: string,
    characteristic_type: string,
    adhoc_value: string,
    characteristic_value: string,
    characteristic_type_name: string,
    created_date: string,
    modified_date: string,
  ) {
    this.id = id;
    this.characteristic_type = characteristic_type;
    this.adhoc_value = adhoc_value;
    this.characteristic_value = characteristic_value;
    this.characteristic_type_name = characteristic_type_name;
    this.created_date = created_date;
    this.modified_date = modified_date;
  }
}
