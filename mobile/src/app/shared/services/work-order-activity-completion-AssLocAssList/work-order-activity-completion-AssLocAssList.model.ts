export class WorkOrderActivityCompletionAssLocAssListModel {
  public id: string;
  public node_id: string;
  public asset_id: string;
  public participation: string;
  public measurent_type: string;
  public reading_type: string;
  public current_value: string;
  public asset_description: string;
  public asset_type: string;
  public reading_datetime: string;
  public created_date: string;
  public modified_date: string;
  public service_histories: [];

  constructor(
    id: string,
    node_id: string,
    asset_id: string,
    participation: string,
    measurent_type: string,
    reading_type: string,
    current_value: string,
    asset_description: string,
    asset_type: string,
    reading_datetime: string,
    created_date: string,
    modified_date: string,
    service_histories: []
  ) {
    this.id = id;
    this.node_id = node_id;
    this.asset_id = asset_id;
    this.participation = participation;
    this.measurent_type = measurent_type;
    this.reading_type = reading_type;
    this.current_value = current_value;
    this.asset_description = asset_description;
    this.asset_type = asset_type;
    this.reading_datetime = reading_datetime;
    this.created_date = created_date;
    this.modified_date = modified_date;
    this.service_histories = service_histories;
  }
}
