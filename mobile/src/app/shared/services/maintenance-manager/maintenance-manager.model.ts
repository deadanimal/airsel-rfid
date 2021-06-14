export class MaintenanceManagerModel {
  public id: string;
  public maintenance_manager: string;
  public description: string;
  public status: string;
  public user_id: string;
  public created_date: any;
  public modified_date: any;

  constructor(
    id: string,
    maintenance_manager: string,
    description: string,
    status: any,
    user_id: any,
    created_date: any,
    modified_date: any,
  ) {
    this.id = id;
    this.maintenance_manager = maintenance_manager;
    this.description = description;
    this.status = status;
    this.user_id = user_id;
    this.created_date = created_date;
    this.modified_date = modified_date;
  }
}
