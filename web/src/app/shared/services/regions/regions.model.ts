export class RegionsModel {
  public id: string;
  public name: string;
  public created_at: any;
  public modified_at: any;

  constructor(
    id: string,
    name: string,
    created_at: any,
    modified_at: any,
  ) {
    this.id = id;
    this.name = name;
    this.created_at = created_at;
    this.modified_at = modified_at;
  }
}
