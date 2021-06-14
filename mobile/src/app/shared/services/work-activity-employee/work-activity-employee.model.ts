export class WorkActivityEmployee {
  public id: string;
  public employee_id: string;
  public work_order_activity_completion_id: string;
  public created_date: any;
  public modified_date: any;

  constructor(
    id: string,
    employee_id: string,
    work_order_activity_completion_id: string,
    created_date: any,
    modified_date: any
  ) {
    this.id = id;
    this.employee_id = employee_id;
    this.work_order_activity_completion_id = work_order_activity_completion_id;
    this.created_date = created_date;
    this.modified_date = modified_date;
  }
}
