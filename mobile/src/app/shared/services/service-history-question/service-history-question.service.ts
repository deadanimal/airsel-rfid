import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { HttpClient } from "@angular/common/http";
import { Form } from "@angular/forms";
import { tap } from "rxjs/operators";
import { Observable } from "rxjs";
import { ServiceHistoryQuestionModel } from "./service-history-question.model";

@Injectable({
  providedIn: "root",
})
export class ServiceHistoryQuestionService {
  url: string = environment.baseUrl + "v1/service-history-question/";

  // Data
  public atmodels: ServiceHistoryQuestionModel[] = [];
  public atmodel: ServiceHistoryQuestionModel;

  constructor(private http: HttpClient) { }

  post(body): Observable<ServiceHistoryQuestionModel> {
    return this.http.post<any>(this.url, body).pipe(
      tap((res) => {
        console.log("ServiceHistoryQuestionModel", res);
      })
    );
  }

  get(): Observable<ServiceHistoryQuestionModel[]> {
    return this.http.get<any>(this.url).pipe(
      tap((res) => {
        console.log("ServiceHistoryQuestionModel", res);
        this.atmodels = res;
      })
    );
  }

  getOne(id: string): Observable<ServiceHistoryQuestionModel> {
    let urlID = this.url + id + "/";
    return this.http.get<ServiceHistoryQuestionModel>(urlID).pipe(
      tap((res: ServiceHistoryQuestionModel) => {
        console.log("ServiceHistoryQuestionModel", res);
        this.atmodel = res;
      })
    );
  }

  update(body: Form): Observable<ServiceHistoryQuestionModel> {
    return this.http.patch<ServiceHistoryQuestionModel>(this.url, body).pipe(
      tap((res) => {
        console.log("ServiceHistoryQuestionModel", res);
      })
    );
  }

  delete(id: string): Observable<any> {
    return this.http.delete(this.url + id + "/").pipe(
      tap((res) => {
        console.log("ServiceHistoryQuestionModel", res);
      })
    );
  }

  filter(field: string): Observable<ServiceHistoryQuestionModel[]> {
    let urlFilter = this.url + "?" + field;
    return this.http.get<ServiceHistoryQuestionModel[]>(urlFilter).pipe(
      tap((res) => {
        console.log("ServiceHistoryQuestionModel", res);
      })
    );
  }

  getQna(field: any): Observable<ServiceHistoryQuestionModel[]> {
    let urlFilter = this.url + "get_service_history_qna/";
    return this.http.post<any>(urlFilter, field).pipe(
      tap((res) => {
        console.log("ServiceHistoryQuestionModel", res);
      })
    );
  }
}
