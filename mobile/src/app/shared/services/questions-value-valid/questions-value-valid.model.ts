export class QuestionValidValueModel {
  public id: string;
  public seq_valid: string;
  public code_valid: string;
  public short_text_valid: string;
  public text_valid: string;
  public created_date: any;
  public modified_date: any;

  constructor(
    id: string,
    seq_valid: string,
    code_valid: string,
    short_text_valid: string,
    text_valid: string,
    created_date: any,
    modified_date: any,
  ) {
    this.id = id;
    this.seq_valid = seq_valid;
    this.code_valid = code_valid;
    this.short_text_valid = short_text_valid;
    this.text_valid = text_valid;
    this.created_date = created_date;
    this.modified_date = modified_date;
  }
}
