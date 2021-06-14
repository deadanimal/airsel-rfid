export class OperationalReadingsModel {
  public id: string;
  // public running_hours: number;
  // public pressure_reading: number;
  // public flow_rate: number;
  // public created_date: string;
  // public modified_date: string;
  public asset_id: string;
  public badge_number: string
  public current_value: string;
  public measurent_identifier: string;
  public measurent_type: string;
  public initial_value_flag: string;
  public owning_organization: string;
  public reading_datetime: string;
  public submitted_datetime: string;
  public created_date: string;
  public modified_date: string;
  constructor(
    id: string,
    asset_id: string,
    badge_number: string,
    current_value: string,
    measurent_identifier: string,
    measurent_type: string,
    initial_value_flag: string,
    owning_organization: string,
    reading_datetime: string,
    submitted_datetime: string,
    created_date: string,
    modified_date: string
  ) {
    this.id = id;
    this.asset_id = asset_id;
    this.badge_number = badge_number;
    this.current_value = current_value;
    this.measurent_identifier = measurent_identifier;
    this.measurent_type = measurent_type;
    this.initial_value_flag = initial_value_flag;
    this.owning_organization = owning_organization;
    this.reading_datetime = reading_datetime;
    this.submitted_datetime = submitted_datetime;
    this.created_date = created_date;
    this.modified_date = modified_date;
  }
}
