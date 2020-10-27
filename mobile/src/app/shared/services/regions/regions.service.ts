import { Injectable } from '@angular/core';
import { environment } from "src/environments/environment";
import { HttpClient } from "@angular/common/http";
import { Form } from "@angular/forms";
import { tap } from "rxjs/operators";
import { Observable } from "rxjs";
import { RegionsModel } from "./regions.model";

@Injectable({
  providedIn: 'root'
})
export class RegionsService {
  url: string = environment.baseUrl + "v1/regions/";

  // Data
  public mmodels: RegionsModel[] = [];
  public mmodel: RegionsModel;

  constructor(private http: HttpClient) {}

  post(body: Form): Observable<RegionsModel> {
    return this.http.post<any>(this.url, body).pipe(
      tap((res) => {
        console.log("RegionsModel", res);
      })
    );
  }

  get(): Observable<RegionsModel[]> {
    return this.http.get<any>(this.url).pipe(
      tap((res) => {
        console.log("RegionsModel", res);
        this.mmodels = res;
      })
    );
  }

  getOne(id: string): Observable<RegionsModel> {
    let urlID = this.url + id + "/";
    return this.http.get<RegionsModel>(urlID).pipe(
      tap((res: RegionsModel) => {
        console.log("RegionsModel", res);
        this.mmodel = res;
      })
    );
  }

  update(body: Form): Observable<RegionsModel> {
    return this.http.patch<RegionsModel>(this.url, body).pipe(
      tap((res) => {
        console.log("RegionsModel", res);
      })
    );
  }

  delete(id: string): Observable<any> {
    return this.http.delete(this.url + id + "/").pipe(
      tap((res) => {
        console.log("RegionsModel", res);
      })
    );
  }

  filter(field: string): Observable<RegionsModel[]> {
    let urlFilter = this.url + "?" + field;
    return this.http.get<RegionsModel[]>(urlFilter).pipe(
      tap((res) => {
        console.log("RegionsModel", res);
      })
    );
  }
}
