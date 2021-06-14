export class AssetLocAssLisSerHisModel {
  public id: string;
  public service_history_type: string;
  public effective_datetime: string;
  public start_date_time: string;
  public end_date_time: string;
  public comments: string;
  public failure_type: string;
  public failure_mode: string;
  public failure_repair: string;
  public failure_component: string;
  public failure_root_cause: string;
  public svc_hist_type_req_fl: string;
  public downtime_reason: string;
  public question: string;
  public created_date: any;
  public modified_date: any;

  constructor(
    id: string,
    service_history_type: string,
    effective_datetime: string,
    start_date_time: string,
    end_date_time: string,
    comments: string,
    failure_type: string,
    failure_mode: string,
    failure_repair: string,
    failure_component: string,
    failure_root_cause: string,
    svc_hist_type_req_fl: string,
    downtime_reason: string,
    question: string,
    created_date: any,
    modified_date: any,
  ) {
    this.id = id;
    this.service_history_type = service_history_type;
    this.effective_datetime = effective_datetime;
    this.start_date_time = start_date_time;
    this.end_date_time = end_date_time;
    this.comments = comments;
    this.failure_type = failure_type;
    this.failure_mode = failure_mode;
    this.failure_repair = failure_repair;
    this.failure_component = failure_component;
    this.failure_root_cause = failure_root_cause;
    this.svc_hist_type_req_fl = svc_hist_type_req_fl;
    this.downtime_reason = downtime_reason;
    this.question = question;
    this.created_date = created_date;
    this.modified_date = modified_date;
  }
}
