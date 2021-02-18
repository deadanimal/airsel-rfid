export class StockReceiveModel {
  public id: string;
  public asset_type_id: string;

  public created_at: string;
  public modified_at: string;

  constructor(
     id: string,
     asset_type_id: string,

     created_at: string,
     modified_at: string,
  ) {
    this.id = id;
    this.asset_type_id = asset_type_id;

    this.created_at = created_at;
    this.modified_at = modified_at;
  }
}
