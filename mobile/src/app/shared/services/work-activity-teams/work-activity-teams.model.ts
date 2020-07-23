export class WorkActivityTeamsModel {
  public id: string;
  public work_activity: string;
  public teammate: string;
  public created_date: any;
  public modified_date: any;

  constructor(
    id: string,
    work_activity: string,
    teammate: string,
    created_date: any,
    modified_date: any
  ) {
    this.id = id;
    this.work_activity = work_activity;
    this.teammate = teammate;
    this.created_date = created_date;
    this.modified_date = modified_date;
  }
}
