import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { HttpClient } from "@angular/common/http";
import { Form } from "@angular/forms";
import { tap } from "rxjs/operators";
import { Observable } from "rxjs";
import { AssetsRegistrationModel } from "./assets-registration.model";

@Injectable({
  providedIn: "root",
})
export class AssetsRegistrationService {
  url: string = environment.baseUrl + "v1/asset-registration/";

  // Data
  public amodels: AssetsRegistrationModel[] = [];
  public amodel: AssetsRegistrationModel;

  constructor(private http: HttpClient) { }

  post(body): Observable<AssetsRegistrationModel> {
    return this.http.post<any>(this.url, body).pipe(
      tap((res) => {
      })
    );
  }

  get(): Observable<AssetsRegistrationModel[]> {
    return this.http.get<any>(this.url).pipe(
      tap((res) => {
        this.amodels = res;
      })
    );
  }

  getApprovedList(): Observable<AssetsRegistrationModel[]> {
    let NewUrl: string = environment.baseUrl + "v1/asset-registration/approved_list/";
    return this.http.get<any>(NewUrl).pipe(
      tap((res) => {
        this.amodels = res;
      })
    );
  }

  getNewRegList(): Observable<AssetsRegistrationModel[]> {
    let NewUrl: string = environment.baseUrl + "v1/asset-registration/new_register_list/";
    return this.http.get<any>(NewUrl).pipe(
      tap((res) => {
        this.amodels = res;
      })
    );
  }

  getNewProcessedList(): Observable<AssetsRegistrationModel[]> {
    let NewUrl: string = environment.baseUrl + "v1/asset-registration/new_processed_list/";
    return this.http.get<any>(NewUrl).pipe(
      tap((res) => {
        this.amodels = res;
      })
    );
  }
  getProcessedList(): Observable<AssetsRegistrationModel[]> {
    let NewUrl: string = environment.baseUrl + "v1/asset-registration/processed_list/";
    return this.http.get<any>(NewUrl).pipe(
      tap((res) => {
        this.amodels = res;
      })
    );
  }

  getRejectedList(): Observable<AssetsRegistrationModel[]> {
    let NewUrl: string = environment.baseUrl + "v1/asset-registration/rejected_list/";
    return this.http.get<any>(NewUrl).pipe(
      tap((res) => {
        this.amodels = res;
      })
    );
  }

  getOne(id: string): Observable<AssetsRegistrationModel> {
    let urlID = this.url + id + "/";
    return this.http.get<AssetsRegistrationModel>(urlID).pipe(
      tap((res: AssetsRegistrationModel) => {
        this.amodel = res;
      })
    );
  }

  update(id: string, body: Form): Observable<AssetsRegistrationModel> {
    let urlTemp = this.url + id + '/'
    return this.http.patch<AssetsRegistrationModel>(urlTemp, body).pipe(
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

  filter(field: string): Observable<AssetsRegistrationModel[]> {
    let urlFilter = this.url + "?" + field + "/";
    return this.http.get<AssetsRegistrationModel[]>(urlFilter).pipe(
      tap((res) => {
      })
    );
  }
}
