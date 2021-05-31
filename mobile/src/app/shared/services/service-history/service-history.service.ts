import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { HttpClient } from "@angular/common/http";
import { Form } from "@angular/forms";
import { tap } from "rxjs/operators";
import { Observable } from "rxjs";
import { ServiceHistoryModel } from "./service-history.model";

@Injectable({
  providedIn: "root",
})
export class ServiceHistoryService {
  url: string = environment.baseUrl + "v1/service-history/";

  // Data
  public atmodels: ServiceHistoryModel[] = [];
  public atmodel: ServiceHistoryModel;

  constructor(private http: HttpClient) { }

  post(body): Observable<ServiceHistoryModel> {
    return this.http.post<any>(this.url, body).pipe(
      tap((res) => {
        console.log("ServiceHistoryModel", res);
      })
    );
  }

  get(): Observable<ServiceHistoryModel[]> {
    return this.http.get<any>(this.url).pipe(
      tap((res) => {
        console.log("ServiceHistoryModel", res);
        this.atmodels = res;
      })
    );
  }

  getOne(id: string): Observable<ServiceHistoryModel> {
    let urlID = this.url + id + "/";
    return this.http.get<ServiceHistoryModel>(urlID).pipe(
      tap((res: ServiceHistoryModel) => {
        console.log("ServiceHistoryModel", res);
        this.atmodel = res;
      })
    );
  }

  update(body: Form): Observable<ServiceHistoryModel> {
    return this.http.patch<ServiceHistoryModel>(this.url, body).pipe(
      tap((res) => {
        console.log("ServiceHistoryModel", res);
      })
    );
  }

  delete(id: string): Observable<any> {
    return this.http.delete(this.url + id + "/").pipe(
      tap((res) => {
        console.log("ServiceHistoryModel", res);
      })
    );
  }

  filter(field: string): Observable<ServiceHistoryModel[]> {
    let urlFilter = this.url + "?" + field;
    return this.http.get<ServiceHistoryModel[]>(urlFilter).pipe(
      tap((res) => {
        console.log("ServiceHistoryModel", res);
      })
    );
  }
}
