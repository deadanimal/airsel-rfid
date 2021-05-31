export class ServiceHistoryModel {
  public id: string;
  public service_hist_type: string;
  public service_hist_desc: string;
  public service_hist_bo: string;
  public category: string;
  public service_hist_subclass: string;
  public created_date: string;
  public modified_date: string;

  constructor(
    id: string,
    service_hist_type: string,
    service_hist_desc: string,
    service_hist_bo: string,
    category: string,
    service_hist_subclass: string,
    created_date: string,
    modified_date: string
  ) {
    this.id = id;
    this.service_hist_type = service_hist_type;
    this.service_hist_desc = service_hist_desc;
    this.service_hist_bo = service_hist_bo;
    this.category = category;
    this.service_hist_subclass = service_hist_subclass;
    this.created_date = created_date;
    this.modified_date = modified_date;
  }
}
