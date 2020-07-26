export class WorkActivitiesModel {
  public id: string;
  public name: string;
  public wams_work_id: string;
  public completed_at: string;
  public maintenance_form: string;
  public asset: string;
  public activity_type: string;
  public status: string;
  public due_date: string;
  public created_date: any;
  public modified_date: any;

  constructor(
    id: string,
    name: string,
    wams_work_id: string,
    completed_at: string,
    maintenance_form: string,
    asset: string,
    activity_type: string,
    status: string,
    due_date: string,
    created_date: any,
    modified_date: any
  ) {
    this.id = id;
    this.name = name;
    this.wams_work_id = wams_work_id;
    this.completed_at = completed_at;
    this.maintenance_form = maintenance_form;
    this.asset = asset;
    this.activity_type = activity_type;
    this.status = status;
    this.due_date = due_date;
    this.created_date = created_date;
    this.modified_date = modified_date;
  }
}
