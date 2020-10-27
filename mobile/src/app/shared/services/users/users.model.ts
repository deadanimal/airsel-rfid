export class UsersModel {
  public id: string;
  public employee_id: string;
  public first_name: string;
  public last_name: string;
  public ic_number: string;
  public email: string;
  public country: string;
  public phone_no: string;
  public job_title: string;
  public status: boolean;
  public service_area: string;
  public crewshift_id: string;
  public department: string;

  constructor(
    id: string,
    employee_id: string,
    first_name: string,
    last_name: string,
    ic_number: string,
    email: string,
    country: string,
    phone_no: string,
    job_title: string,
    status: boolean,
    service_area: string,
    crewshift_id: string,
    department: string,
  ) {
    this.id = id;
    this.employee_id = employee_id;
    this.first_name = first_name;
    this.last_name = last_name;
    this.ic_number = ic_number;
    this.email = email;
    this.country = country;
    this.phone_no = phone_no;
    this.job_title = job_title;
    this.status = status;
    this.service_area = service_area;
    this.crewshift_id = crewshift_id;
    this.department = department;
  }
}
