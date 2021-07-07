import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { HttpClient } from "@angular/common/http";
import { Form } from "@angular/forms";
import { tap } from "rxjs/operators";
import { Observable } from "rxjs";
import { WorkOrderActivityCompletionModel } from "./work-order-activity-completion.model";

@Injectable({
  providedIn: "root",
})
export class WorkOrderActivityCompletionService {
  url: string = environment.baseUrl + "v1/work-order-activity-completion/";

  // Data
  public wamodels: WorkOrderActivityCompletionModel[] = [];
  public wamodel: WorkOrderActivityCompletionModel;

  constructor(private http: HttpClient) { }

  post(body: Form): Observable<WorkOrderActivityCompletionModel> {
    return this.http.post<any>(this.url, body).pipe(
      tap((res) => {
        console.log("WorkOrderActivityCompletionModel", res);
      })
    );
  }

  get(): Observable<WorkOrderActivityCompletionModel[]> {
    return this.http.get<any>(this.url).pipe(
      tap((res) => {
        console.log("WorkOrderActivityCompletionModel", res);
        this.wamodels = res;
      })
    );
  }

  getOne(id: string): Observable<WorkOrderActivityCompletionModel> {
    let urlID = this.url + id + "/";
    return this.http.get<WorkOrderActivityCompletionModel>(urlID).pipe(
      tap((res: WorkOrderActivityCompletionModel) => {
        console.log("WorkOrderActivityCompletionModel", res);
        this.wamodel = res;
      })
    );
  }

  update(id: string, body): Observable<WorkOrderActivityCompletionModel> {
    return this.http
      .patch<WorkOrderActivityCompletionModel>(this.url + id + "/", body)
      .pipe(
        tap((res) => {
          console.log("WorkOrderActivityCompletionModel", res);
        })
      );
  }

  delete(id: string): Observable<any> {
    return this.http.delete(this.url + id + "/").pipe(
      tap((res) => {
        console.log("WorkOrderActivityCompletionModel", res);
      })
    );
  }

  filter(field: string): Observable<WorkOrderActivityCompletionModel[]> {
    let urlFilter = this.url + "?" + field;
    return this.http.get<WorkOrderActivityCompletionModel[]>(urlFilter).pipe(
      tap((res) => {
        console.log("WorkOrderActivityCompletionModel", res);
      })
    );
  }

  get_dashboard_status_statistic(body): Observable<any[]> {
    let url = this.url + "get_dashboard_status_statistic/";
    return this.http.post<any[]>(url, body).pipe(
      tap((res) => {
        // console.log("WorkOrderActivityCompletionModel", res);
      })
    );
  }

  asc_ordered_list(body): Observable<WorkOrderActivityCompletionModel[]> {
    let urlOrdered = this.url + "asc_ordered_list/";
    return this.http.post<any>(urlOrdered, body).pipe(
      tap((res) => {
        console.log("WorkOrderActivityCompletionModel", res);
      })
    );
  }
}
