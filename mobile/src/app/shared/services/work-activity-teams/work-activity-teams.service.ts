import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { HttpClient } from "@angular/common/http";
import { Form } from "@angular/forms";
import { tap } from "rxjs/operators";
import { Observable } from "rxjs";
import { WorkActivityTeamsModel } from "./work-activity-teams.model";

@Injectable({
  providedIn: "root",
})
export class WorkActivityTeamsService {
  url: string = environment.baseUrl + "v1/work-activity-teams/";

  // Data
  public watmodels: WorkActivityTeamsModel[] = [];
  public watmodel: WorkActivityTeamsModel;

  constructor(private http: HttpClient) {}

  post(body: Form): Observable<WorkActivityTeamsModel> {
    return this.http.post<any>(this.url, body).pipe(
      tap((res) => {
        console.log("WorkActivityTeamsModel", res);
      })
    );
  }

  get(): Observable<WorkActivityTeamsModel[]> {
    return this.http.get<any>(this.url).pipe(
      tap((res) => {
        console.log("WorkActivityTeamsModel", res);
        this.watmodels = res;
      })
    );
  }

  getOne(id: string): Observable<WorkActivityTeamsModel> {
    let urlID = this.url + id + "/";
    return this.http.get<WorkActivityTeamsModel>(urlID).pipe(
      tap((res: WorkActivityTeamsModel) => {
        console.log("WorkActivityTeamsModel", res);
        this.watmodel = res;
      })
    );
  }

  update(body: Form): Observable<WorkActivityTeamsModel> {
    return this.http.patch<WorkActivityTeamsModel>(this.url, body).pipe(
      tap((res) => {
        console.log("WorkActivityTeamsModel", res);
      })
    );
  }

  delete(id: string): Observable<any> {
    return this.http.delete(this.url + id + "/").pipe(
      tap((res) => {
        console.log("WorkActivityTeamsModel", res);
      })
    );
  }

  filter(field: string): Observable<WorkActivityTeamsModel[]> {
    let urlFilter = this.url + "?" + field;
    return this.http.get<WorkActivityTeamsModel[]>(urlFilter).pipe(
      tap((res) => {
        console.log("WorkActivityTeamsModel", res);
      })
    );
  }
}
