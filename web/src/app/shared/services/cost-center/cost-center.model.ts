export class CostCenterModel {
  public id: string;
  public costCenter: string;
  public description: string;
  public created_date: any;
  public modified_date: any;

  constructor(
    id: string,
    costCenter: string,
    description: string,
    created_date: any,
    modified_date: any,
  ) {
    this.id = id;
    this.costCenter = costCenter;
    this.description = description;
    this.created_date = created_date;
    this.modified_date = modified_date;
  }
}
