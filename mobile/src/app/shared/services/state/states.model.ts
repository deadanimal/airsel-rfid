export class StatesModel {
  public id: string;
  public code: string;
  public state: string;
  public created_date: any;
  public modified_date: any;

  constructor(id: string, code: string, state: string, created_date: any, modified_date: any) {
    this.id = id;
    this.code = code;
    this.state = state;
    this.created_date = created_date;
    this.modified_date = modified_date;
  }
}
