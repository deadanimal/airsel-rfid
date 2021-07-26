import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { HttpClient } from "@angular/common/http";
import { Form } from "@angular/forms";
import { tap } from "rxjs/operators";
import { Observable } from "rxjs";
import { MaintenancePlannerModel } from "./maintenance-planner.model";

@Injectable({
  providedIn: "root",
})
export class MaintenancePlannerService {
  url: string = environment.baseUrl + "v1/planner/";

  // Data
  public atmodels: MaintenancePlannerModel[] = [];
  public atmodel: MaintenancePlannerModel;

  constructor(private http: HttpClient) {}

  post(body): Observable<MaintenancePlannerModel> {
    return this.http.post<any>(this.url, body).pipe(
      tap((res) => {
      })
    );
  }

  get(): Observable<MaintenancePlannerModel[]> {
    return this.http.get<any>(this.url).pipe(
      tap((res) => {
        this.atmodels = res;
      })
    );
  }

  getOne(id: string): Observable<MaintenancePlannerModel> {
    let urlID = this.url + id + "/";
    return this.http.get<MaintenancePlannerModel>(urlID).pipe(
      tap((res: MaintenancePlannerModel) => {
        this.atmodel = res;
      })
    );
  }

  update(body: Form): Observable<MaintenancePlannerModel> {
    return this.http.patch<MaintenancePlannerModel>(this.url, body).pipe(
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

  filter(field: string): Observable<MaintenancePlannerModel[]> {
    let urlFilter = this.url + "?" + field + "/";
    return this.http.get<MaintenancePlannerModel[]>(urlFilter).pipe(
      tap((res) => {
      })
    );
  }
}
