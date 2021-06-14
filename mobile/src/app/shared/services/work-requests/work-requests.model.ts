export class WorkRequestsModel {
  public id: string;
  public badge_no: string;
  public description: string;
  public long_description: string;
  public required_by_date: string;
  public bo_status: string;
  public creation_date_time: string;
  public creation_user: string;
  public down_time_start: string;
  public planner: string;
  public work_class: string;
  public work_category: string;
  public work_priority: string;
  public requestor: string;
  public owning_access_group: string;
  public first_name: string;
  public last_name: string;
  public primary_phone: string;
  public mobile_phone: string;
  public home_phone: string;
  public node_id: string;
  public asset_id: string;
  public attachment: string;
  public status: string;
  public record_by: string;
  public record_date: any;
  public modified_by: string;
  public modified_date: any;

  constructor(
    id: string,
    badge_no: string,
    description: string,
    long_description: string,
    required_by_date: string,
    bo_status: string,
    creation_date_time: string,
    creation_user: string,
    down_time_start: string,
    planner: string,
    work_class: string,
    work_category: string,
    work_priority: string,
    requestor: string,
    owning_access_group: string,
    first_name: string,
    last_name: string,
    primary_phone: string,
    mobile_phone: string,
    home_phone: string,
    node_id: string,
    asset_id: string,
    attachment: string,
    status: string,
    record_by: string,
    record_date: any,
    modified_by: string,
    modified_date: any
  ) {
    this.id = id;
    this.badge_no = badge_no;
    this.description = description;
    this.long_description = long_description;
    this.required_by_date = required_by_date;
    this.bo_status = bo_status;
    this.creation_date_time = creation_date_time;
    this.creation_user = creation_user;
    this.down_time_start = down_time_start;
    this.planner = planner;
    this.work_class = work_class;
    this.work_category = work_category;
    this.work_priority = work_priority;
    this.requestor = requestor;
    this.owning_access_group = owning_access_group;
    this.first_name = first_name;
    this.last_name = last_name;
    this.primary_phone = primary_phone;
    this.mobile_phone = mobile_phone;
    this.home_phone = home_phone;
    this.node_id = node_id;
    this.asset_id = asset_id;
    this.attachment = attachment;
    this.record_by = record_by;
    this.record_date = record_date;
    this.modified_by = modified_by;
    this.modified_date = modified_date;
    this.status = status;
  }
}
