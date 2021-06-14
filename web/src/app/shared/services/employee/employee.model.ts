export class EmployeeModel {
  public uuid: string;
  public employee_id: string;
  public username: string;
  public email: string;
  public first_name: string;
  public last_name: string;
  public phone_no: string;
  public ic_number: string;
  public user_type: string;
  public job_title: string;
  public service_area: string;
  public crewshift_id: string;
  public department: string;
  public bo_status_cd: string;
  public country: string;
  public business_unit_cd: string;
  public hr_employee_number: string;
  public position: string;
  public staff_no: string;
  public region: string;
  public status: string;
  public error: string;
  public errorMessage: string;
  public password: string;
  public time: string;
  public hash: string;
  public is_wams: string;
  public is_ad: string;
  public is_erp: string;
  public created_date: string;
  public modified_date: string;

  constructor(
    uuid: string,
    employee_id: string,
    username: string,
    email: string,
    first_name: string,
    last_name: string,
    phone_no: string,
    ic_number: string,
    user_type: string,
    job_title: string,
    service_area: string,
    crewshift_id: string,
    department: string,
    bo_status_cd: string,
    country: string,
    business_unit_cd: string,
    hr_employee_number: string,
    position: string,
    staff_no: string,
    region: string,
    status: string,
    error: string,
    errorMessage: string,
    password: string,
    time: string,
    hash: string,
    is_wams: string,
    is_ad: string,
    is_erp: string,
    created_date: string,
    modified_date: string
  ) {
    this.uuid = uuid;
    this.employee_id = employee_id;
    this.username = username;
    this.email = email;
    this.first_name = first_name;
    this.last_name = last_name;
    this.phone_no = phone_no;
    this.ic_number = ic_number;
    this.user_type = user_type;
    this.job_title = job_title;
    this.service_area = service_area;
    this.crewshift_id = crewshift_id;
    this.department = department;
    this.bo_status_cd = bo_status_cd;
    this.country = country;
    this.business_unit_cd = business_unit_cd;
    this.hr_employee_number = hr_employee_number;
    this.position = position;
    this.staff_no = staff_no;
    this.region = region;
    this.status = status;
    this.error = error;
    this.errorMessage = errorMessage;
    this.password = password;
    this.time = time;
    this.hash = hash;
    this.is_wams = is_wams;
    this.is_ad = is_ad;
    this.is_erp = is_erp;
    this.created_date = created_date;
    this.modified_date = modified_date;
  }
}
