import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { HttpClient } from "@angular/common/http";
import { Form } from "@angular/forms";
import { tap } from "rxjs/operators";
import { Observable } from "rxjs";
import { AssetsAttributeModel } from "./assets-attribute.model";

@Injectable({
  providedIn: "root",
})
export class AssetsAttributeService {
  url: string = environment.baseUrl + "v1/asset-registration/";

  // Data
  public amodels: AssetsAttributeModel[] = [];
  public amodel: AssetsAttributeModel;

  constructor(private http: HttpClient) { }

  post(body): Observable<AssetsAttributeModel> {
    return this.http.post<any>(this.url, body).pipe(
      tap((res) => {
        console.log("AssetsAttributeModel", res);
      })
    );
  }

  get(): Observable<AssetsAttributeModel[]> {
    return this.http.get<any>(this.url).pipe(
      tap((res) => {
        console.log("AssetsAttributeModel", res);
        this.amodels = res;
      })
    );
  }

  getApprovedList(): Observable<AssetsAttributeModel[]> {
    let NewUrl: string = environment.baseUrl + "v1/asset-registration/approved_list/";
    return this.http.get<any>(NewUrl).pipe(
      tap((res) => {
        console.log("AssetsAttributeModel", res);
        this.amodels = res;
      })
    );
  }

  getNewRegList(): Observable<AssetsAttributeModel[]> {
    let NewUrl: string = environment.baseUrl + "v1/asset-registration/new_register_list/";
    return this.http.get<any>(NewUrl).pipe(
      tap((res) => {
        console.log("AssetsAttributeModel", res);
        this.amodels = res;
      })
    );
  }

  getNewProcessedList(): Observable<AssetsAttributeModel[]> {
    let NewUrl: string = environment.baseUrl + "v1/asset-registration/new_processed_list/";
    return this.http.get<any>(NewUrl).pipe(
      tap((res) => {
        console.log("AssetsAttributeModel", res);
        this.amodels = res;
      })
    );
  }
  getProcessedList(): Observable<AssetsAttributeModel[]> {
    let NewUrl: string = environment.baseUrl + "v1/asset-registration/processed_list/";
    return this.http.get<any>(NewUrl).pipe(
      tap((res) => {
        console.log("AssetsAttributeModel", res);
        this.amodels = res;
      })
    );
  }

  getRejectedList(): Observable<AssetsAttributeModel[]> {
    let NewUrl: string = environment.baseUrl + "v1/asset-registration/rejected_list/";
    return this.http.get<any>(NewUrl).pipe(
      tap((res) => {
        console.log("AssetsAttributeModel", res);
        this.amodels = res;
      })
    );
  }

  getOne(id: string): Observable<AssetsAttributeModel> {
    let urlID = this.url + id + "/";
    return this.http.get<AssetsAttributeModel>(urlID).pipe(
      tap((res: AssetsAttributeModel) => {
        console.log("AssetsAttributeModel", res);
        this.amodel = res;
      })
    );
  }

  update(id: string, body: Form): Observable<AssetsAttributeModel> {
    let urlTemp = this.url + id + '/'
    return this.http.patch<AssetsAttributeModel>(urlTemp, body).pipe(
      tap((res) => {
        console.log("AssetsAttributeModel", res);
      })
    );
  }

  delete(id: string): Observable<any> {
    return this.http.delete(this.url + id + "/").pipe(
      tap((res) => {
        console.log("AssetsAttributeModel", res);
      })
    );
  }

  filter(field: string): Observable<AssetsAttributeModel[]> {
    let urlFilter = this.url + "?" + field + "/";
    return this.http.get<AssetsAttributeModel[]>(urlFilter).pipe(
      tap((res) => {
        console.log("AssetsAttributeModel", res);
      })
    );
  }
}
