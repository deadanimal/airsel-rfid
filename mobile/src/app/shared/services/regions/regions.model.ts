export class RegionsModel {
  public id: string;
  public name: string;
  public created_date: any;
  public modified_date: any;

  constructor(id: string, name: string, created_date: any, modified_date: any) {
    this.id = id;
    this.name = name;
    this.created_date = created_date;
    this.modified_date = modified_date;
  }
}
