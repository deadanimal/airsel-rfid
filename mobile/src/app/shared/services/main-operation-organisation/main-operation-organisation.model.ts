export class MainOperationsModel {
  public id: string;
  public main_operation: string;
  public created_at: any;
  public modified_at: any;

  constructor(
    id: string,
    main_operation: string,
    created_at: any,
    modified_at: any
  ) {
    this.id = id;
    this.main_operation = main_operation;
    this.created_at = created_at;
    this.modified_at = modified_at;
  }
}
