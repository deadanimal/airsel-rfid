export class ServiceHistoriesQuestionModel {
  public id: string;
  public seq: string;
  public code: string;
  public short_text: string;
  public text: string;
  public style: string;
  public respone: string;
  public response_check_box: string;
  public response_radio: string;
  public responseDate: string;
  public response_datetime: any;
  public valid_value: [];
  public created_date: any;
  public modified_date: any;

  constructor(
    id: string,
    seq: string,
    code: string,
    short_text: string,
    text: string,
    style: string,
    respone: string,
    response_check_box: string,
    response_radio: string,
    responseDate: string,
    response_datetime: any,
    valid_value: [],
    created_date: any,
    modified_date: any,
  ) {
    this.id = id;
    this.seq = seq;
    this.code = code;
    this.short_text = short_text;
    this.text = text;
    this.style = style;
    this.respone = respone;
    this.response_check_box = response_check_box;
    this.response_radio = response_radio;
    this.responseDate = responseDate;
    this.response_datetime = response_datetime;
    this.valid_value = valid_value;
    this.created_date = created_date;
    this.modified_date = modified_date;
  }
}
