export class OwningorganisationsModel {
  public id: string;
  public name: string;
  public description: string;
  public detail_description: string;
  public record_date: string;
  public modified_date: any;
  public record_by: any;
  public modified_by: any;

  constructor(
    id: string,
    name: string,
    description: string,
    detail_description: any,
    record_date: any,
    modified_date: any,
    record_by: any,
    modified_by: any,
  ) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.detail_description = detail_description;
    this.record_date = record_date;
    this.modified_date = modified_date;
    this.record_by = record_by;
    this.modified_by = modified_by;
  }
}
