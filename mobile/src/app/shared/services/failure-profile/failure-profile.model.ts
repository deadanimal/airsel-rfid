export class FailureProfileModel {
  public id: string;
  public failure_profile: string;
  public description: string;
  public failure_repair: string;
  public failure_mode: string;
  public failure_comp: string;
  public failure_type: string;
  public created_date: any;
  public modified_date: any;

  constructor(
    id: string,
    failure_profile: string,
    description: string,
    failure_repair: string,
    failure_mode: string,
    failure_comp: string,
    failure_type: string,
    created_date: any,
    modified_date: any,
  ) {
    this.id = id;
    this.failure_profile = failure_profile;
    this.description = description;
    this.failure_repair = failure_repair;
    this.failure_mode = failure_mode;
    this.failure_comp = failure_comp;
    this.failure_type = failure_type;
    this.created_date = created_date;
    this.modified_date = modified_date;
  }
}
