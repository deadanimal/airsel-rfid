import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { HttpClient } from "@angular/common/http";
import { Form } from "@angular/forms";
import { tap } from "rxjs/operators";
import { Observable } from "rxjs";
import { OperationalReadingsModel } from "./operational-readings.model";

@Injectable({
  providedIn: "root",
})
export class OperationalReadingsService {
  url: string = environment.baseUrl + "v1/operational-readings-pipe/";

  // Data
  public ormodels: OperationalReadingsModel[] = [];
  public ormodel: OperationalReadingsModel;

  constructor(private http: HttpClient) { }

  post(body: Form): Observable<OperationalReadingsModel> {
    return this.http.post<any>(this.url, body).pipe(
      tap((res) => {
        console.log("OperationalReadingsModel", res);
      })
    );
  }

  get(): Observable<OperationalReadingsModel[]> {
    return this.http.get<any>(this.url).pipe(
      tap((res) => {
        console.log("OperationalReadingsModel", res);
        this.ormodels = res;
      })
    );
  }

  getOne(id: string): Observable<OperationalReadingsModel> {
    let urlID = this.url + id + "/";
    return this.http.get<OperationalReadingsModel>(urlID).pipe(
      tap((res: OperationalReadingsModel) => {
        console.log("OperationalReadingsModel", res);
        this.ormodel = res;
      })
    );
  }

  update(id: string, body: Form): Observable<OperationalReadingsModel> {
    return this.http.patch<OperationalReadingsModel>(this.url + id + '/', body).pipe(
      tap((res) => {
        console.log("OperationalReadingsModel", res);
      })
    );
  }

  delete(id: string): Observable<any> {
    return this.http.delete(this.url + id + "/").pipe(
      tap((res) => {
        console.log("OperationalReadingsModel", res);
      })
    );
  }

  filter(field: string): Observable<OperationalReadingsModel[]> {
    let urlFilter = this.url + "?" + field;
    return this.http.get<OperationalReadingsModel[]>(urlFilter).pipe(
      tap((res) => {
        console.log("OperationalReadingsModel", res);
      })
    );
  }

  getDescOrderList(body): Observable<OperationalReadingsModel[]> {
    let urlOrdered = this.url + "asc_ordered_list/";
    return this.http.post<any>(urlOrdered, body).pipe(
      tap((res) => {
        console.log("WorkOrderActivityCompletionModel", res);
      })
    );
  }
}
