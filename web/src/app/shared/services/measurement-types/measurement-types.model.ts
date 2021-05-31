export class MeasurementTypesModel {
  public id: string;
  public measurement_identifier: string;
  public measurement_type: any;
  public description: any;
  public record_date: any;
  public modified_date: any;

  constructor(
    id: string,
    measurement_identifier: string,
    measurement_type: any,
    description: any,
    record_date: any,
    modified_date: any,
  ) {
    this.id = id;
    this.measurement_identifier = measurement_identifier;
    this.description = description;
    this.measurement_type = measurement_type;
    this.record_date = record_date;
    this.modified_date = modified_date;
  }

}
