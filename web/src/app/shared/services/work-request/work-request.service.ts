import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { HttpClient } from "@angular/common/http";
import { Form } from "@angular/forms";
import { tap } from "rxjs/operators";
import { Observable } from "rxjs";
import { WorkRequestModel } from "./work-request.model";

@Injectable({
  providedIn: "root",
})
export class WorkRequestService {
  url: string = environment.baseUrl + "v1/work-requests/";

  // Data
  public atmodels: WorkRequestModel[] = [];
  public atmodel: WorkRequestModel;

  constructor(private http: HttpClient) {}

  post(body): Observable<WorkRequestModel> {
    return this.http.post<any>(this.url, body).pipe(
      tap((res) => {
      })
    );
  }

  get(): Observable<WorkRequestModel[]> {
    return this.http.get<any>(this.url).pipe(
      tap((res) => {
        this.atmodels = res;
      })
    );
  }

  getOne(id: string): Observable<WorkRequestModel> {
    let urlID = this.url + id + "/";
    return this.http.get<WorkRequestModel>(urlID).pipe(
      tap((res: WorkRequestModel) => {
        this.atmodel = res;
      })
    );
  }

  update(body: Form): Observable<WorkRequestModel> {
    return this.http.patch<WorkRequestModel>(this.url, body).pipe(
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

  filter(field: string): Observable<WorkRequestModel[]> {
    let urlFilter = this.url + "?" + field + "/";
    return this.http.get<WorkRequestModel[]>(urlFilter).pipe(
      tap((res) => {
      })
    );
  }
}
