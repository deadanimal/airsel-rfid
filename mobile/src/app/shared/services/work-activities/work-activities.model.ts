export class WorkActivitiesModel {
  public id: string;
  public bo_status: string;
  public required_by_date: string;
  public activity_id: string;
  public work_class: string;
  public work_category: string;
  public description: string;
  public completion_date_time: string;
  public node_id: string;
  public asset_id: string;
  public participation: string;
  public service_history_type_dt: string;
  public effective_date_time_dt: string;
  public comments_dt: string;
  public start_date_time: string;
  public end_date_time: string;
  public downtime_reason: string;
  public service_history_type_f: string;
  public effective_date_time_f: string;
  public comments_f: string;
  public failure_type: string;
  public failure_mode: string;
  public failure_repair: string;
  public failure_component: string;
  public failure_root_cause: string;
  public record_by: string;
  public record_date: string;
  public modified_by: string;
  public modified_date: string;

  constructor(
    id: string,
    bo_status: string,
    required_by_date: string,
    activity_id: string,
    work_class: string,
    work_category: string,
    description: string,
    completion_date_time: string,
    node_id: string,
    asset_id: string,
    participation: string,
    service_history_type_dt: string,
    effective_date_time_dt: string,
    comments_dt: string,
    start_date_time: string,
    end_date_time: string,
    downtime_reason: string,
    service_history_type_f: string,
    effective_date_time_f: string,
    comments_f: string,
    failure_type: string,
    failure_mode: string,
    failure_repair: string,
    failure_component: string,
    failure_root_cause: string,
    record_by: string,
    record_date: string,
    modified_by: string,
    modified_date: string
  ) {
    this.id = id;
    this.bo_status = bo_status;
    this.required_by_date = required_by_date;
    this.activity_id = activity_id;
    this.work_class = work_class;
    this.work_category = work_category;
    this.description = description;
    this.completion_date_time = completion_date_time;
    this.node_id = node_id;
    this.asset_id = asset_id;
    this.participation = participation;
    this.service_history_type_dt = service_history_type_dt;
    this.effective_date_time_dt = effective_date_time_dt;
    this.comments_dt = comments_dt;
    this.start_date_time = start_date_time;
    this.end_date_time = end_date_time;
    this.downtime_reason = downtime_reason;
    this.service_history_type_f = service_history_type_f;
    this.effective_date_time_f = effective_date_time_f;
    this.comments_f = comments_f;
    this.failure_type = failure_type;
    this.failure_mode = failure_mode;
    this.failure_repair = failure_repair;
    this.failure_component = failure_component;
    this.failure_root_cause = failure_root_cause;
    this.record_by = record_by;
    this.record_date = record_date;
    this.modified_by = modified_by;
    this.modified_date = modified_date;
  }
}
