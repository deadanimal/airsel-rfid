export class AssetLocatioSyncModel {
  public uuid: string;
  public node_id: string;
  public description: string;
  public created_at: any;
  public modified_at: any;

  constructor(
    uuid: string,
    node_id: string,
    description: string,
    created_at: any,
    modified_at: any,
  ) {
    this.uuid = uuid;
    this.node_id = node_id;
    this.description = description;
    this.created_at = created_at;
    this.modified_at = modified_at;
  }
}
