export class UsersModel {
  public id: string;
  public username: string;
  public email: string;
  public name: string;
  public mobile: string;
  public nric: string;
  public user_type: string;
  public profile_picture: string;
  public is_active: boolean;
  public date_joined: string;

  constructor(
    id: string,
    username: string,
    email: string,
    name: string,
    mobile: string,
    nric: string,
    user_type: string,
    profile_picture: string,
    is_active: boolean,
    date_joined: string
  ) {
    this.id = id;
    this.username = username;
    this.email = email;
    this.name = name;
    this.mobile = mobile;
    this.nric = nric;
    this.user_type = user_type;
    this.profile_picture = profile_picture;
    this.is_active = is_active;
    this.date_joined = date_joined;
  }
}
