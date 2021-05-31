import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { HttpClient } from "@angular/common/http";
import { Form } from "@angular/forms";
import { tap } from "rxjs/operators";
import { Observable } from "rxjs";
import { CostCenterModel } from "./cost-center.model";

@Injectable({
  providedIn: "root",
})
export class CostCenterService {
  url: string = environment.baseUrl + "v1/cost-center/";

  // Data
  public atmodels: CostCenterModel[] = [];
  public atmodel: CostCenterModel;

  constructor(private http: HttpClient) {}

  post(body): Observable<CostCenterModel> {
    return this.http.post<any>(this.url, body).pipe(
      tap((res) => {
      })
    );
  }

  get(): Observable<CostCenterModel[]> {
    return this.http.get<any>(this.url).pipe(
      tap((res) => {
        this.atmodels = res;
      })
    );
  }

  getOne(id: string): Observable<CostCenterModel> {
    let urlID = this.url + id + "/";
    return this.http.get<CostCenterModel>(urlID).pipe(
      tap((res: CostCenterModel) => {
        this.atmodel = res;
      })
    );
  }

  update(body: Form): Observable<CostCenterModel> {
    return this.http.patch<CostCenterModel>(this.url, body).pipe(
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

  filter(field: string): Observable<CostCenterModel[]> {
    let urlFilter = this.url + "?" + field + "/";
    return this.http.get<CostCenterModel[]>(urlFilter).pipe(
      tap((res) => {
      })
    );
  }
}
