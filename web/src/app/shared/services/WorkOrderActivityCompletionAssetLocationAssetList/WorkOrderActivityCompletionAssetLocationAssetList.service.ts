import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { HttpClient } from "@angular/common/http";
import { Form } from "@angular/forms";
import { tap } from "rxjs/operators";
import { Observable } from "rxjs";
import { WorkOrderActivityCompletionAssetLocationAssetListModel } from "./WorkOrderActivityCompletionAssetLocationAssetList.model";

@Injectable({
  providedIn: "root",
})
export class WorkOrderActivityCompletionAssetLocationAssetListService {
  url: string = environment.baseUrl + "v1/work-order-activity-completion-asset-location-asset-list/";

  // Data
  public atmodels: WorkOrderActivityCompletionAssetLocationAssetListModel[] = [];
  public atmodel: WorkOrderActivityCompletionAssetLocationAssetListModel;

  constructor(private http: HttpClient) {}

  post(body): Observable<WorkOrderActivityCompletionAssetLocationAssetListModel> {
    return this.http.post<any>(this.url, body).pipe(
      tap((res) => {
      })
    );
  }

  get(): Observable<WorkOrderActivityCompletionAssetLocationAssetListModel[]> {
    return this.http.get<any>(this.url).pipe(
      tap((res) => {
        this.atmodels = res;
      })
    );
  }

  getOne(id: string): Observable<WorkOrderActivityCompletionAssetLocationAssetListModel> {
    let urlID = this.url + id + "/";
    return this.http.get<WorkOrderActivityCompletionAssetLocationAssetListModel>(urlID).pipe(
      tap((res: WorkOrderActivityCompletionAssetLocationAssetListModel) => {
        this.atmodel = res;
      })
    );
  }

  update(body: Form): Observable<WorkOrderActivityCompletionAssetLocationAssetListModel> {
    return this.http.patch<WorkOrderActivityCompletionAssetLocationAssetListModel>(this.url, body).pipe(
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

  filter(field: string): Observable<WorkOrderActivityCompletionAssetLocationAssetListModel[]> {
    let urlFilter = this.url + "?" + field + "/";
    return this.http.get<WorkOrderActivityCompletionAssetLocationAssetListModel[]>(urlFilter).pipe(
      tap((res) => {
      })
    );
  }
}
