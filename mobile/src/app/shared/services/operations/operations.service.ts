import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { HttpClient } from "@angular/common/http";
import { Form } from "@angular/forms";
import { tap } from "rxjs/operators";
import { Observable } from "rxjs";
import { OperationsModel } from "./operations.model";

@Injectable({
  providedIn: "root",
})
export class OperationsService {
  url: string = environment.baseUrl + "v1/operation/";

  // Data
  public rmodels: OperationsModel[] = [];
  public rmodel: OperationsModel;

  constructor(private http: HttpClient) { }

  post(body: Form): Observable<OperationsModel> {
    return this.http.post<any>(this.url, body).pipe(
      tap((res) => {
        console.log("OperationsModel", res);
      })
    );
  }

  get(): Observable<OperationsModel[]> {
    return this.http.get<any>(this.url).pipe(
      tap((res) => {
        console.log("OperationsModel", res);
        this.rmodels = res;
      })
    );
  }

  getOne(id: string): Observable<OperationsModel> {
    let urlID = this.url + id + "/";
    return this.http.get<OperationsModel>(urlID).pipe(
      tap((res: OperationsModel) => {
        console.log("OperationsModel", res);
        this.rmodel = res;
      })
    );
  }

  update(body: Form): Observable<OperationsModel> {
    return this.http.patch<OperationsModel>(this.url, body).pipe(
      tap((res) => {
        console.log("OperationsModel", res);
      })
    );
  }

  delete(id: string): Observable<any> {
    return this.http.delete(this.url + id + "/").pipe(
      tap((res) => {
        console.log("OperationsModel", res);
      })
    );
  }

  filter(field: string): Observable<OperationsModel[]> {
    let urlFilter = this.url + "?" + field;
    return this.http.get<OperationsModel[]>(urlFilter).pipe(
      tap((res) => {
        console.log("OperationsModel", res);
      })
    );
  }
}
