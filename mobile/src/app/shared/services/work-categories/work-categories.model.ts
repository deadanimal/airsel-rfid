export class WorkCategoryModel {
  public id: string;
  public planner: string;
  public description: string;
  public status: string;
  public user_id: string;
  public created_date: any;
  public modified_date: any;

  constructor(
    id: string,
    planner: string,
    description: string,
    status: string,
    user_id: string,
    created_date: any,
    modified_date: any
  ) {
    this.id = id;
    this.planner = planner;
    this.description = description;
    this.status = status;
    this.user_id = user_id;
    this.created_date = created_date;
    this.modified_date = modified_date;
  }
}
