export class AssetAttributeModel {
  public id: string;
  public characteristic_type: string;
  public adhoc_value: string;
  public characteristic_value: string;
  public action_type: string;
  public characteristic_type_name: string;
  public created_at: string;
  public modified_at: string;

  constructor(
    id: string,
    characteristic_type: string,
    adhoc_value: string,
    characteristic_value: string,
    action_type: string,
    characteristic_type_name: string,
    created_at: string,
    modified_at: string
  ) {
    this.id = id;
    this.characteristic_type = characteristic_type;
    this.adhoc_value = adhoc_value;
    this.characteristic_value = characteristic_value;
    this.action_type = action_type;
    this.characteristic_type_name = characteristic_type_name;
    this.created_at = created_at;
    this.modified_at = modified_at;
  }
}
