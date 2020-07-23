export class NotificationsModel {
  public id: string;
  public title: string;
  public message: string;
  public receiver: string;
  public created_date: any;
  public modified_date: any;

  constructor(
    id: string,
    title: string,
    message: string,
    receiver: string,
    created_date: any,
    modified_date: any
  ) {
    this.id = id;
    this.title = title;
    this.message = message;
    this.receiver = receiver;
    this.created_date = created_date;
    this.modified_date = modified_date;
  }
}
