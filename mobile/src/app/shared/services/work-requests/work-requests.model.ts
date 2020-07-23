export class WorkRequestsModel {
  public id: string;
  public name: string;
  public description: string;
  public asset: string;
  public issue_type: string;
  public image: any;
  public created_date: any;
  public modified_date: any;

  constructor(
    id: string,
    name: string,
    description: string,
    asset: string,
    issue_type: string,
    image: any,
    created_date: any,
    modified_date: any
  ) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.asset = asset;
    this.issue_type = issue_type;
    this.image = image;
    this.created_date = created_date;
    this.modified_date = modified_date;
  }
}
