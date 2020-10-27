import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { HttpClient } from "@angular/common/http";
import { Form } from "@angular/forms";
import { tap } from "rxjs/operators";
import { Observable } from "rxjs";
import { WorkActivitiesModel } from "./work-activities.model";

@Injectable({
  providedIn: "root",
})
export class WorkActivitiesService {
  url: string = environment.baseUrl + "v1/work-activities/";

  // Data
  public wamodels: WorkActivitiesModel[] = [];
  public wamodel: WorkActivitiesModel;

  constructor(private http: HttpClient) {}

  post(body: Form): Observable<WorkActivitiesModel> {
    return this.http.post<any>(this.url, body).pipe(
      tap((res) => {
        console.log("WorkActivitiesModel", res);
      })
    );
  }

  get(): Observable<WorkActivitiesModel[]> {
    return this.http.get<any>(this.url).pipe(
      tap((res) => {
        console.log("WorkActivitiesModel", res);
        this.wamodels = res;
      })
    );
  }

  getOne(id: string): Observable<WorkActivitiesModel> {
    let urlID = this.url + id + "/";
    return this.http.get<WorkActivitiesModel>(urlID).pipe(
      tap((res: WorkActivitiesModel) => {
        console.log("WorkActivitiesModel", res);
        this.wamodel = res;
      })
    );
  }

  update(id: string, body: Form): Observable<WorkActivitiesModel> {
    return this.http.patch<WorkActivitiesModel>(this.url + id + '/', body).pipe(
      tap((res) => {
        console.log("WorkActivitiesModel", res);
      })
    );
  }

  delete(id: string): Observable<any> {
    return this.http.delete(this.url + id + "/").pipe(
      tap((res) => {
        console.log("WorkActivitiesModel", res);
      })
    );
  }

  filter(field: string): Observable<WorkActivitiesModel[]> {
    let urlFilter = this.url + "?" + field;
    return this.http.get<WorkActivitiesModel[]>(urlFilter).pipe(
      tap((res) => {
        console.log("WorkActivitiesModel", res);
      })
    );
  }
}
