export class ServiceHistoryQuestionModel {
  public id: string;
  public question_seq: string;
  public question_cd: string;
  public question_desc: string;
  public service_history_id: string;
  public created_date: any;
  public modified_date: any;

  constructor(
    id: string,
    question_seq: string,
    question_cd: string,
    question_desc: string,
    service_history_id: string,
    created_date: any,
    modified_date: any,
  ) {
    this.id = id;
    this.question_seq = question_seq;
    this.question_cd = question_cd;
    this.question_desc = question_desc;
    this.created_date = created_date;
    this.modified_date = modified_date;
    this.service_history_id = service_history_id;
  }
}
