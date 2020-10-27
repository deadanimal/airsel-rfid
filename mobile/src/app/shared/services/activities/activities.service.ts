import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { HttpClient } from "@angular/common/http";
import { Form } from "@angular/forms";
import { tap } from "rxjs/operators";
import { Observable } from "rxjs";
import { ActivitiesModel } from "./activities.model";

@Injectable({
  providedIn: "root",
})
export class ActivitiesService {
  url: string = environment.baseUrl + "v1/activities/";

  // Data
  public actmodels: ActivitiesModel[] = [];
  public actmodel: ActivitiesModel;

  constructor(private http: HttpClient) {}

  post(body: Form): Observable<ActivitiesModel> {
    return this.http.post<any>(this.url, body).pipe(
      tap((res) => {
        console.log("ActivitiesModel", res);
      })
    );
  }

  get(): Observable<ActivitiesModel[]> {
    return this.http.get<any>(this.url).pipe(
      tap((res) => {
        console.log("ActivitiesModel", res);
        this.actmodels = res;
      })
    );
  }

  getOne(id: string): Observable<ActivitiesModel> {
    let urlID = this.url + id + "/";
    return this.http.get<ActivitiesModel>(urlID).pipe(
      tap((res: ActivitiesModel) => {
        console.log("ActivitiesModel", res);
        this.actmodel = res;
      })
    );
  }

  update(body: Form): Observable<ActivitiesModel> {
    return this.http.patch<ActivitiesModel>(this.url, body).pipe(
      tap((res) => {
        console.log("ActivitiesModel", res);
      })
    );
  }

  delete(id: string): Observable<any> {
    return this.http.delete(this.url + id + "/").pipe(
      tap((res) => {
        console.log("ActivitiesModel", res);
      })
    );
  }

  filter(field: string): Observable<ActivitiesModel[]> {
    let urlFilter = this.url + "?" + field;
    return this.http.get<ActivitiesModel[]>(urlFilter).pipe(
      tap((res) => {
        console.log("ActivitiesModel", res);
      })
    );
  }
}
