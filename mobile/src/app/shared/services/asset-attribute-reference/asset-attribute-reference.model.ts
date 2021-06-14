export class AssetAttributeReferenceModel {
  public id: string;
  public attribute_field_name: string;
  public char_type_cd: string;
  public created_at: any;
  public modified_at: any;

  constructor(
    id: string,
    attribute_field_name: string,
    char_type_cd: string,
    created_at: any,
    modified_at: any,
  ) {
    this.id = id;
    this.attribute_field_name = attribute_field_name;
    this.char_type_cd = char_type_cd;
    this.created_at = created_at;
    this.modified_at = modified_at;
  }
}
