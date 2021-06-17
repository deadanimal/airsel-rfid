import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { HttpClient } from "@angular/common/http";
import { Form } from "@angular/forms";
import { tap } from "rxjs/operators";
import { Observable } from "rxjs";
import { WorkActivityEmployee } from "./work-activity-employee.model";

@Injectable({
  providedIn: "root",
})
export class WorkActivityEmployeeService {
  url: string = environment.baseUrl + "v1/work-activity-employee/";

  // Data
  public watmodels: WorkActivityEmployee[] = [];
  public watmodel: WorkActivityEmployee;

  constructor(private http: HttpClient) {}

  post(body: Form): Observable<WorkActivityEmployee> {
    return this.http.post<any>(this.url, body).pipe(
      tap((res) => {
        console.log("WorkActivityEmployee", res);
      })
    );
  }

  get(): Observable<WorkActivityEmployee[]> {
    return this.http.get<any>(this.url).pipe(
      tap((res) => {
        console.log("WorkActivityEmployee", res);
        this.watmodels = res;
      })
    );
  }

  getOne(id: string): Observable<WorkActivityEmployee> {
    let urlID = this.url + id + "/";
    return this.http.get<WorkActivityEmployee>(urlID).pipe(
      tap((res: WorkActivityEmployee) => {
        console.log("WorkActivityEmployee", res);
        this.watmodel = res;
      })
    );
  }

  update(body: Form): Observable<WorkActivityEmployee> {
    return this.http.patch<WorkActivityEmployee>(this.url, body).pipe(
      tap((res) => {
        console.log("WorkActivityEmployee", res);
      })
    );
  }

  delete(id: string): Observable<any> {
    return this.http.delete(this.url + id + "/").pipe(
      tap((res) => {
        console.log("WorkActivityEmployee", res);
      })
    );
  }

  filter(field: string): Observable<WorkActivityEmployee[]> {
    let urlFilter = this.url + "?" + field;
    return this.http.get<WorkActivityEmployee[]>(urlFilter).pipe(
      tap((res) => {
        console.log("WorkActivityEmployee", res);
      })
    );
  }

  get_dashboard_status_statistic(body): Observable<any> {
    let url = this.url + "get_dashboard_status_statistic/";
    return this.http.post<any>(url, body).pipe(
      tap((res) => {
        // console.log("WorkActivityEmployee", res);
      })
    );
  }
}
