import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { HttpClient } from "@angular/common/http";
import { Form } from "@angular/forms";
import { tap } from "rxjs/operators";
import { Observable } from "rxjs";
import { WorkOrdersModel } from "./work-orders.model";

@Injectable({
  providedIn: "root",
})
export class WorkOrdersService {
  url: string = environment.baseUrl + "v1/work-orders/";

  // Data
  public womodels: WorkOrdersModel[] = [];
  public womodel: WorkOrdersModel;

  constructor(private http: HttpClient) {}

  post(body: Form): Observable<WorkOrdersModel> {
    return this.http.post<any>(this.url, body).pipe(
      tap((res) => {
        console.log("WorkOrdersModel", res);
      })
    );
  }

  get(): Observable<WorkOrdersModel[]> {
    return this.http.get<any>(this.url).pipe(
      tap((res) => {
        console.log("WorkOrdersModel", res);
        this.womodels = res;
      })
    );
  }

  getOne(id: string): Observable<WorkOrdersModel> {
    let urlID = this.url + id + "/";
    return this.http.get<WorkOrdersModel>(urlID).pipe(
      tap((res: WorkOrdersModel) => {
        console.log("WorkOrdersModel", res);
        this.womodel = res;
      })
    );
  }

  update(body: Form): Observable<WorkOrdersModel> {
    return this.http.patch<WorkOrdersModel>(this.url, body).pipe(
      tap((res) => {
        console.log("WorkOrdersModel", res);
      })
    );
  }

  delete(id: string): Observable<any> {
    return this.http.delete(this.url + id + "/").pipe(
      tap((res) => {
        console.log("WorkOrdersModel", res);
      })
    );
  }

  filter(field: string): Observable<WorkOrdersModel[]> {
    let urlFilter = this.url + "?" + field;
    return this.http.get<WorkOrdersModel[]>(urlFilter).pipe(
      tap((res) => {
        console.log("WorkOrdersModel", res);
      })
    );
  }
}
