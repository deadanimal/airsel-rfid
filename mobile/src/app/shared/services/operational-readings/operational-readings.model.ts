export class OperationalReadingsModel {
  public id: string;
  public running_hours: number;
  public pressure_reading: number;
  public flow_rate: number;
  public created_date: any;
  public modified_date: any;

  constructor(
    id: string,
    running_hours: number,
    pressure_reading: number,
    flow_rate: number,
    created_date: any,
    modified_date: any
  ) {
    this.id = id;
    this.running_hours = running_hours;
    this.pressure_reading = pressure_reading;
    this.flow_rate = flow_rate;
    this.created_date = created_date;
    this.modified_date = modified_date;
  }
}
