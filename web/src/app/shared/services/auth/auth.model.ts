export class User {
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
    date_joined: any
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
    this.date_joined = date_joined;
  }
}

export class TokenResponse {
  public refresh: string;
  public access: string;
  constructor(refresh: string, access: string) {
    this.refresh = refresh;
    this.access = access;
  }
}

export class Registration {
  public username: string;
  public email: string;
  public password1: string;
  public password2: string;
  constructor(
    username: string,
    email: string,
    password1: string,
    password2: string
  ) {
    this.username = username;
    this.email = email;
    this.password1 = password1;
    this.password2 = password2;
  }
}
