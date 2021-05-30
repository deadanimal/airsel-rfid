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
  public atmodels: WorkOrderActivityCompletionModel[] = [];
  public atmodel: WorkOrderActivityCompletionModel;

  constructor(private http: HttpClient) {}

  post(body): Observable<WorkOrderActivityCompletionModel> {
    return this.http.post<any>(this.url, body).pipe(
      tap((res) => {
      })
    );
  }

  get(): Observable<WorkOrderActivityCompletionModel[]> {
    return this.http.get<any>(this.url).pipe(
      tap((res) => {
        this.atmodels = res;
      })
    );
  }

  getOne(id: string): Observable<WorkOrderActivityCompletionModel> {
    let urlID = this.url + id + "/";
    return this.http.get<WorkOrderActivityCompletionModel>(urlID).pipe(
      tap((res: WorkOrderActivityCompletionModel) => {
        this.atmodel = res;
      })
    );
  }

  update(body: Form): Observable<WorkOrderActivityCompletionModel> {
    return this.http.patch<WorkOrderActivityCompletionModel>(this.url, body).pipe(
      tap((res) => {
      })
    );
  }

  delete(id: string): Observable<any> {
    return this.http.delete(this.url + id + "/").pipe(
      tap((res) => {
      })
    );
  }

  filter(field: string): Observable<WorkOrderActivityCompletionModel[]> {
    let urlFilter = this.url + "?" + field + "/";
    return this.http.get<WorkOrderActivityCompletionModel[]>(urlFilter).pipe(
      tap((res) => {
      })
    );
  }
}
