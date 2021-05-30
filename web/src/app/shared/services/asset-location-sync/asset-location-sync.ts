export class AssetLocationSync {
  public id: string;
  public uuid: string;
  public node_id: string;
  public description: any;
  public created_date: any;
  public modified_date: any;

  constructor(
    uuid: string,
    node_id: string,
    description: any,
    created_date: any,
    modified_date: any,
  ) {
    this.uuid = uuid;
    this.node_id = node_id;
    this.description = description;
    this.created_date = created_date;
    this.modified_date = modified_date;
  }
}
