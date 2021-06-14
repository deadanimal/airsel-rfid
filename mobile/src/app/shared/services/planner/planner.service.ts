import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { HttpClient } from "@angular/common/http";
import { Form } from "@angular/forms";
import { tap } from "rxjs/operators";
import { Observable } from "rxjs";
import { PlannerModel } from "./planner.model";

@Injectable({
  providedIn: "root",
})
export class PlannerService {
  url: string = environment.baseUrl + "v1/planner/";

  // Data
  public rmodels: PlannerModel[] = [];
  public rmodel: PlannerModel;

  constructor(private http: HttpClient) { }

  post(body: Form): Observable<PlannerModel> {
    return this.http.post<any>(this.url, body).pipe(
      tap((res) => {
        console.log("PlannerModel", res);
      })
    );
  }

  get(): Observable<PlannerModel[]> {
    return this.http.get<any>(this.url).pipe(
      tap((res) => {
        console.log("PlannerModel", res);
        this.rmodels = res;
      })
    );
  }

  getOne(id: string): Observable<PlannerModel> {
    let urlID = this.url + id + "/";
    return this.http.get<PlannerModel>(urlID).pipe(
      tap((res: PlannerModel) => {
        console.log("PlannerModel", res);
        this.rmodel = res;
      })
    );
  }

  update(body: Form): Observable<PlannerModel> {
    return this.http.patch<PlannerModel>(this.url, body).pipe(
      tap((res) => {
        console.log("PlannerModel", res);
      })
    );
  }

  delete(id: string): Observable<any> {
    return this.http.delete(this.url + id + "/").pipe(
      tap((res) => {
        console.log("PlannerModel", res);
      })
    );
  }

  filter(field: string): Observable<PlannerModel[]> {
    let urlFilter = this.url + "?" + field;
    return this.http.get<PlannerModel[]>(urlFilter).pipe(
      tap((res) => {
        console.log("PlannerModel", res);
      })
    );
  }
}
