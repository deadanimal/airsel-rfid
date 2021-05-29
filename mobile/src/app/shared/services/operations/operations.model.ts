export class OperationsModel {
  public id: string;
  public operation: string;
  public created_at: any;
  public modified_at: any;

  constructor(
    id: string,
    operation: string,
    created_at: any,
    modified_at: any
  ) {
    this.id = id;
    this.operation = operation;
    this.created_at = created_at;
    this.modified_at = modified_at;
  }
}
