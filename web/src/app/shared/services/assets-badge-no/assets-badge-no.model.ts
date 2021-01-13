export class AssetsBadgeNoModel {
  public id: string;
  public asset_uuid: string;
  public asset_primary_category: string;
  public short: string;
  public description: string;
  public status: string;
  public latest_no: string;

  constructor(
    id: string,
    asset_uuid: string,
    asset_primary_category: string,
    short: string,
    description: string,
    status: string,
    latest_no: string
  ) {
    this.id = id;
    this.asset_uuid = asset_uuid;
    this.asset_primary_category = asset_primary_category;
    this.short = short;
    this.description = description;
    this.status = status;
    this.latest_no = latest_no;
  }
}
