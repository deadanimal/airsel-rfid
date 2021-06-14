import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { HttpClient } from "@angular/common/http";
import { Form } from "@angular/forms";
import { tap } from "rxjs/operators";
import { Observable } from "rxjs";
import { QuestionValidValueModel } from "./questions-value-valid.model";

@Injectable({
  providedIn: "root",
})
export class QuestionValidValueService {
  url: string = environment.baseUrl + "v1/questions-value-valid/";

  // Data
  public atmodels: QuestionValidValueModel[] = [];
  public atmodel: QuestionValidValueModel;

  constructor(private http: HttpClient) { }

  post(body): Observable<QuestionValidValueModel> {
    return this.http.post<any>(this.url, body).pipe(
      tap((res) => {
        console.log("QuestionValidValueModel", res);
      })
    );
  }

  get(): Observable<QuestionValidValueModel[]> {
    return this.http.get<any>(this.url).pipe(
      tap((res) => {
        console.log("QuestionValidValueModel", res);
        this.atmodels = res;
      })
    );
  }

  getOne(id: string): Observable<QuestionValidValueModel> {
    let urlID = this.url + id + "/";
    return this.http.get<QuestionValidValueModel>(urlID).pipe(
      tap((res: QuestionValidValueModel) => {
        console.log("QuestionValidValueModel", res);
        this.atmodel = res;
      })
    );
  }

  update(body: Form): Observable<QuestionValidValueModel> {
    return this.http.patch<QuestionValidValueModel>(this.url, body).pipe(
      tap((res) => {
        console.log("QuestionValidValueModel", res);
      })
    );
  }

  delete(id: string): Observable<any> {
    return this.http.delete(this.url + id + "/").pipe(
      tap((res) => {
        console.log("QuestionValidValueModel", res);
      })
    );
  }

  filter(field: string): Observable<QuestionValidValueModel[]> {
    let urlFilter = this.url + "?" + field;
    return this.http.get<QuestionValidValueModel[]>(urlFilter).pipe(
      tap((res) => {
        console.log("QuestionValidValueModel", res);
      })
    );
  }
}
