import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { HttpClient } from "@angular/common/http";
import { Form } from "@angular/forms";
import { tap } from "rxjs/operators";
import { Observable } from "rxjs";
import { WorkOrderActivityCompletionAssLocAssListModel } from './work-order-activity-completion-AssLocAssList.model';

@Injectable({
  providedIn: "root",
})
export class WorkOrderActivityCompletionAssLocAssListService {
  url: string = environment.baseUrl + "v1/work-order-activity-completion-asset-location-asset-list/";

  // Data
  public amodels: WorkOrderActivityCompletionAssLocAssListModel[] = [];
  public amodel: WorkOrderActivityCompletionAssLocAssListModel;

  constructor(private http: HttpClient) { }

  post(body): Observable<WorkOrderActivityCompletionAssLocAssListModel> {
    return this.http.post<any>(this.url, body).pipe(
      tap((res) => {
        console.log("WorkOrderActivityCompletionAssLocAssListModel", res);
      })
    );
  }

  get(): Observable<WorkOrderActivityCompletionAssLocAssListModel[]> {
    return this.http.get<any>(this.url).pipe(
      tap((res) => {
        console.log("WorkOrderActivityCompletionAssLocAssListModel", res);
        this.amodels = res;
      })
    );
  }

  getOne(id: string): Observable<WorkOrderActivityCompletionAssLocAssListModel> {
    let urlID = this.url + id + "/";
    return this.http.get<WorkOrderActivityCompletionAssLocAssListModel>(urlID).pipe(
      tap((res: WorkOrderActivityCompletionAssLocAssListModel) => {
        console.log("WorkOrderActivityCompletionAssLocAssListModel", res);
        this.amodel = res;
      })
    );
  }

  update(id: string, body): Observable<WorkOrderActivityCompletionAssLocAssListModel> {
    let urlTemp = this.url + id + '/'
    return this.http.patch<WorkOrderActivityCompletionAssLocAssListModel>(urlTemp, body).pipe(
      tap((res) => {
        console.log("WorkOrderActivityCompletionAssLocAssListModel", res);
      })
    );
  }

  delete(id: string): Observable<any> {
    return this.http.delete(this.url + id + "/").pipe(
      tap((res) => {
        console.log("WorkOrderActivityCompletionAssLocAssListModel", res);
      })
    );
  }

  filter(field: string): Observable<WorkOrderActivityCompletionAssLocAssListModel[]> {
    let urlFilter = this.url + "?" + field;
    return this.http.get<WorkOrderActivityCompletionAssLocAssListModel[]>(urlFilter).pipe(
      tap((res) => {
        console.log("WorkOrderActivityCompletionAssLocAssListModel", res);
      })
    );
  }
}
