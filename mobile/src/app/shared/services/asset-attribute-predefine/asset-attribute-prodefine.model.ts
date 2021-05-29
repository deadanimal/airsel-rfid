export class AssetAttributePredefineModel {
  public id: string;
  public attribute_field_name: string;
  public characteristic_value: string;
  public created_at: any;
  public modified_at: any;

  constructor(
    id: string,
    attribute_field_name: string,
    characteristic_value: string,
    created_at: any,
    modified_at: any,
  ) {
    this.id = id;
    this.attribute_field_name = attribute_field_name;
    this.characteristic_value = characteristic_value;
    this.created_at = created_at;
    this.modified_at = modified_at;
  }
}
