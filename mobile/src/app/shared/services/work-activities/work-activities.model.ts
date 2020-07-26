export class WorkActivitiesModel {
  public id: string;
  public wams_work_id: string;
  public completed_at: string;
  public work_category: string;
  public activity_type: string;
  public activity_description: string;
  public status: string;
  public due_date: string;
  public created_at: any;
  public modified_at: any;
  public work_order: string;
  public maintenance_form: string;
  public asset: string;

  constructor(
    id: string,
    wams_work_id: string,
    completed_at: string,
    work_category: string,
    activity_type: string,
    activity_description: string,
    status: string,
    due_date: string,
    created_at: any,
    modified_at: any,
    work_order: string,
    maintenance_form: string,
    asset: string
  ) {
    this.id = id;
    this.wams_work_id = wams_work_id;
    this.completed_at = completed_at;
    this.work_category = work_category;
    this.activity_type = activity_type;
    this.activity_description = activity_description;
    this.status = status;
    this.due_date = due_date;
    this.created_at = created_at;
    this.modified_at = modified_at;
    this.work_order = work_order;
    this.maintenance_form = maintenance_form;
    this.asset = asset;
  }
}
