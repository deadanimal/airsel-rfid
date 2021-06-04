import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { HttpClient } from "@angular/common/http";
import { Form } from "@angular/forms";
import { tap } from "rxjs/operators";
import { Observable } from "rxjs";
import { ServiceHistoriesQuestionModel } from "./service-histories-question.model";

@Injectable({
  providedIn: "root",
})
export class ServiceHistoriesQuestionService {
  url: string = environment.baseUrl + "v1/service-histories-questions/";

  // Data
  public amodels: ServiceHistoriesQuestionModel[] = [];
  public amodel: ServiceHistoriesQuestionModel;

  constructor(private http: HttpClient) { }

  post(body): Observable<ServiceHistoriesQuestionModel> {
    return this.http.post<any>(this.url, body).pipe(
      tap((res) => {
        console.log("ServiceHistoriesQuestionModel", res);
      })
    );
  }

  get(): Observable<ServiceHistoriesQuestionModel[]> {
    return this.http.get<any>(this.url).pipe(
      tap((res) => {
        console.log("ServiceHistoriesQuestionModel", res);
        this.amodels = res;
      })
    );
  }

  getOne(id: string): Observable<ServiceHistoriesQuestionModel> {
    let urlID = this.url + id + "/";
    return this.http.get<ServiceHistoriesQuestionModel>(urlID).pipe(
      tap((res: ServiceHistoriesQuestionModel) => {
        console.log("ServiceHistoriesQuestionModel", res);
        this.amodel = res;
      })
    );
  }

  update(id: string, body: Form): Observable<ServiceHistoriesQuestionModel> {
    let urlTemp = this.url + id + '/'
    return this.http.patch<ServiceHistoriesQuestionModel>(urlTemp, body).pipe(
      tap((res) => {
        console.log("ServiceHistoriesQuestionModel", res);
      })
    );
  }

  delete(id: string): Observable<any> {
    return this.http.delete(this.url + id + "/").pipe(
      tap((res) => {
        console.log("ServiceHistoriesQuestionModel", res);
      })
    );
  }

  filter(field: string): Observable<ServiceHistoriesQuestionModel[]> {
    let urlFilter = this.url + "?" + field;
    return this.http.get<ServiceHistoriesQuestionModel[]>(urlFilter).pipe(
      tap((res) => {
        console.log("ServiceHistoriesQuestionModel", res);
      })
    );
  }
}
