import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { HttpClient } from "@angular/common/http";
import { Form } from "@angular/forms";
import { tap } from "rxjs/operators";
import { Observable } from "rxjs";
import { MainOperationsModel } from './main-operation-organisation.model';

@Injectable({
  providedIn: "root",
})
export class MainOperationOrganisationService {
  url: string = environment.baseUrl + "v1/main-operation-organizations/";

  // Data
  public rmodels: MainOperationsModel[] = [];
  public rmodel: MainOperationsModel;

  constructor(private http: HttpClient) { }

  post(body: Form): Observable<MainOperationsModel> {
    return this.http.post<any>(this.url, body).pipe(
      tap((res) => {
        console.log("MainOperationsModel", res);
      })
    );
  }

  get(): Observable<MainOperationsModel[]> {
    return this.http.get<any>(this.url).pipe(
      tap((res) => {
        console.log("MainOperationsModel", res);
        this.rmodels = res;
      })
    );
  }

  getOne(id: string): Observable<MainOperationsModel> {
    let urlID = this.url + id + "/";
    return this.http.get<MainOperationsModel>(urlID).pipe(
      tap((res: MainOperationsModel) => {
        console.log("MainOperationsModel", res);
        this.rmodel = res;
      })
    );
  }

  update(body: Form): Observable<MainOperationsModel> {
    return this.http.patch<MainOperationsModel>(this.url, body).pipe(
      tap((res) => {
        console.log("MainOperationsModel", res);
      })
    );
  }

  delete(id: string): Observable<any> {
    return this.http.delete(this.url + id + "/").pipe(
      tap((res) => {
        console.log("MainOperationsModel", res);
      })
    );
  }

  filter(field: string): Observable<MainOperationsModel[]> {
    let urlFilter = this.url + "?" + field;
    return this.http.get<MainOperationsModel[]>(urlFilter).pipe(
      tap((res) => {
        console.log("MainOperationsModel", res);
      })
    );
  }
}
