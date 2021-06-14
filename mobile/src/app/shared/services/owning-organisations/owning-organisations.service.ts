import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { HttpClient } from "@angular/common/http";
import { Form } from "@angular/forms";
import { tap } from "rxjs/operators";
import { Observable } from "rxjs";
import { OwningorganisationsModel } from './owning-organisations.model';

@Injectable({
  providedIn: "root",
})
export class OwningorganisationsService {
  url: string = environment.baseUrl + "v1/owning-organizations/";

  // Data
  public rmodels: OwningorganisationsModel[] = [];
  public rmodel: OwningorganisationsModel;

  constructor(private http: HttpClient) { }

  post(body: Form): Observable<OwningorganisationsModel> {
    return this.http.post<any>(this.url, body).pipe(
      tap((res) => {
        console.log("OwningorganisationsModel", res);
      })
    );
  }

  get(): Observable<OwningorganisationsModel[]> {
    return this.http.get<any>(this.url).pipe(
      tap((res) => {
        console.log("OwningorganisationsModel", res);
        this.rmodels = res;
      })
    );
  }

  getOne(id: string): Observable<OwningorganisationsModel> {
    let urlID = this.url + id + "/";
    return this.http.get<OwningorganisationsModel>(urlID).pipe(
      tap((res: OwningorganisationsModel) => {
        console.log("OwningorganisationsModel", res);
        this.rmodel = res;
      })
    );
  }

  update(body: Form): Observable<OwningorganisationsModel> {
    return this.http.patch<OwningorganisationsModel>(this.url, body).pipe(
      tap((res) => {
        console.log("OwningorganisationsModel", res);
      })
    );
  }

  delete(id: string): Observable<any> {
    return this.http.delete(this.url + id + "/").pipe(
      tap((res) => {
        console.log("OwningorganisationsModel", res);
      })
    );
  }

  filter(field: string): Observable<OwningorganisationsModel[]> {
    let urlFilter = this.url + "?" + field;
    return this.http.get<OwningorganisationsModel[]>(urlFilter).pipe(
      tap((res) => {
        console.log("OwningorganisationsModel", res);
      })
    );
  }
}
