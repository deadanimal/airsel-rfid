import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { HttpClient } from "@angular/common/http";
import { Form } from "@angular/forms";
import { tap } from "rxjs/operators";
import { Observable } from "rxjs";
import { AssetsLocationModel } from "./assets-location.model";

@Injectable({
  providedIn: "root",
})
export class AssetsLocationService {
  url: string = environment.baseUrl + "v1/asset-registration/";

  // Data
  public amodels: AssetsLocationModel[] = [];
  public amodel: AssetsLocationModel;

  constructor(private http: HttpClient) { }

  post(body): Observable<AssetsLocationModel> {
    return this.http.post<any>(this.url, body).pipe(
      tap((res) => {
        console.log("AssetsLocationModel", res);
      })
    );
  }

  get(): Observable<AssetsLocationModel[]> {
    return this.http.get<any>(this.url).pipe(
      tap((res) => {
        console.log("AssetsLocationModel", res);
        this.amodels = res;
      })
    );
  }

  getApprovedList(): Observable<AssetsLocationModel[]> {
    let NewUrl: string = environment.baseUrl + "v1/asset-registration/approved_list/";
    return this.http.get<any>(NewUrl).pipe(
      tap((res) => {
        console.log("AssetsLocationModel", res);
        this.amodels = res;
      })
    );
  }

  getNewRegList(): Observable<AssetsLocationModel[]> {
    let NewUrl: string = environment.baseUrl + "v1/asset-registration/new_register_list/";
    return this.http.get<any>(NewUrl).pipe(
      tap((res) => {
        console.log("AssetsLocationModel", res);
        this.amodels = res;
      })
    );
  }

  getNewProcessedList(): Observable<AssetsLocationModel[]> {
    let NewUrl: string = environment.baseUrl + "v1/asset-registration/new_processed_list/";
    return this.http.get<any>(NewUrl).pipe(
      tap((res) => {
        console.log("AssetsLocationModel", res);
        this.amodels = res;
      })
    );
  }
  getProcessedList(): Observable<AssetsLocationModel[]> {
    let NewUrl: string = environment.baseUrl + "v1/asset-registration/processed_list/";
    return this.http.get<any>(NewUrl).pipe(
      tap((res) => {
        console.log("AssetsLocationModel", res);
        this.amodels = res;
      })
    );
  }

  getRejectedList(): Observable<AssetsLocationModel[]> {
    let NewUrl: string = environment.baseUrl + "v1/asset-registration/rejected_list/";
    return this.http.get<any>(NewUrl).pipe(
      tap((res) => {
        console.log("AssetsLocationModel", res);
        this.amodels = res;
      })
    );
  }

  getOne(id: string): Observable<AssetsLocationModel> {
    let urlID = this.url + id + "/";
    return this.http.get<AssetsLocationModel>(urlID).pipe(
      tap((res: AssetsLocationModel) => {
        console.log("AssetsLocationModel", res);
        this.amodel = res;
      })
    );
  }

  update(id: string, body: Form): Observable<AssetsLocationModel> {
    let urlTemp = this.url + id + '/'
    return this.http.patch<AssetsLocationModel>(urlTemp, body).pipe(
      tap((res) => {
        console.log("AssetsLocationModel", res);
      })
    );
  }

  delete(id: string): Observable<any> {
    return this.http.delete(this.url + id + "/").pipe(
      tap((res) => {
        console.log("AssetsLocationModel", res);
      })
    );
  }

  filter(field: string): Observable<AssetsLocationModel[]> {
    let urlFilter = this.url + "?" + field + "/";
    return this.http.get<AssetsLocationModel[]>(urlFilter).pipe(
      tap((res) => {
        console.log("AssetsLocationModel", res);
      })
    );
  }
}
