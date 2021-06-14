export class AssetServiceHistoryModel {
  public id: string;
  public asset_service_history: string;
  public created_at: any;
  public modified_at: any;

  constructor(
    id: string,
    asset_service_history: string,
    created_at: any,
    modified_at: any,
  ) {
    this.id = id;
    this.asset_service_history = asset_service_history;
    this.created_at = created_at;
    this.modified_at = modified_at;
  }
}
