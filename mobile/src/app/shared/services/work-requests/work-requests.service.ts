import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { HttpClient } from "@angular/common/http";
import { Form } from "@angular/forms";
import { tap } from "rxjs/operators";
import { Observable } from "rxjs";
import { WorkRequestsModel } from "./work-requests.model";

@Injectable({
  providedIn: "root",
})
export class WorkRequestsService {
  url: string = environment.baseUrl + "v1/work-requests/";

  // Data
  public wrmodels: WorkRequestsModel[] = [];
  public wrmodel: WorkRequestsModel;

  constructor(private http: HttpClient) {}

  post(body: Form): Observable<WorkRequestsModel> {
    return this.http.post<any>(this.url, body).pipe(
      tap((res) => {
        console.log("WorkRequestsModel", res);
      })
    );
  }

  get(): Observable<WorkRequestsModel[]> {
    return this.http.get<any>(this.url).pipe(
      tap((res) => {
        console.log("WorkRequestsModel", res);
        this.wrmodels = res;
      })
    );
  }

  getOne(id: string): Observable<WorkRequestsModel> {
    let urlID = this.url + id + "/";
    return this.http.get<WorkRequestsModel>(urlID).pipe(
      tap((res: WorkRequestsModel) => {
        console.log("WorkRequestsModel", res);
        this.wrmodel = res;
      })
    );
  }

  update(body: Form): Observable<WorkRequestsModel> {
    return this.http.patch<WorkRequestsModel>(this.url, body).pipe(
      tap((res) => {
        console.log("WorkRequestsModel", res);
      })
    );
  }

  delete(id: string): Observable<any> {
    return this.http.delete(this.url + id + "/").pipe(
      tap((res) => {
        console.log("WorkRequestsModel", res);
      })
    );
  }

  filter(field: string): Observable<WorkRequestsModel[]> {
    let urlFilter = this.url + "?" + field + "/";
    return this.http.get<WorkRequestsModel[]>(urlFilter).pipe(
      tap((res) => {
        console.log("WorkRequestsModel", res);
      })
    );
  }
}
