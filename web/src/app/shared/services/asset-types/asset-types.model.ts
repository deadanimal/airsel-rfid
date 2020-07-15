export class AssetTypesModel {
  public id: string;
  public name: string;
  public category: string;
  public created_at: any;
  public modified_at: any;

  constructor(
    id: string,
    name: string,
    category: string,
    created_at: any,
    modified_at: any,
  ) {
    this.id = id;
    this.name = name;
    this.category = category;
    this.created_at = created_at;
    this.modified_at = modified_at;
  }
}
