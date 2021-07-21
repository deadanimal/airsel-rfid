export class UsersModel {
  public id: string;
  public username: string;
  public email: string;
  public name: string;
  public office_number: string;
  public mobile_number: string;
  public nric: string;
  public user_type: string;
  public profile_picture: string;
  public is_active: boolean;
  public status: boolean;
  public mobile_access: boolean;
  public date_joined: any;


  constructor(
    id: string,
    username: string,
    email: string,
    name: string,
    office_number: string,
    mobile_number: string,
    nric: string,
    user_type: string,
    profile_picture: string,
    is_active: boolean,
    status: boolean,
    mobile_access: boolean,
    date_joined: any,
  ) {
    this.id = id;
    this.username = username;
    this.email = email;
    this.name = name;
    this.office_number = office_number;
    this.mobile_number = mobile_number;
    this.nric = nric;
    this.user_type = user_type;
    this.profile_picture = profile_picture;
    this.is_active = is_active;
    this.status = status;
    this.mobile_access = mobile_access;
    this.date_joined = date_joined;
  }
}
