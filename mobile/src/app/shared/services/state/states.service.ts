import { Injectable } from '@angular/core';
import { environment } from "src/environments/environment";
import { HttpClient } from "@angular/common/http";
import { Form } from "@angular/forms";
import { tap } from "rxjs/operators";
import { Observable } from "rxjs";
import { StatesModel } from "./states.model";

@Injectable({
  providedIn: 'root'
})
export class StatesService {
  url: string = environment.baseUrl + "v1/states/";

  // Data
  public mmodels: StatesModel[] = [];
  public mmodel: StatesModel;

  constructor(private http: HttpClient) { }

  post(body: Form): Observable<StatesModel> {
    return this.http.post<any>(this.url, body).pipe(
      tap((res) => {
        console.log("StatesModel", res);
      })
    );
  }

  get(): Observable<StatesModel[]> {
    return this.http.get<any>(this.url).pipe(
      tap((res) => {
        console.log("StatesModel", res);
        this.mmodels = res;
      })
    );
  }

  getOne(id: string): Observable<StatesModel> {
    let urlID = this.url + id + "/";
    return this.http.get<StatesModel>(urlID).pipe(
      tap((res: StatesModel) => {
        console.log("StatesModel", res);
        this.mmodel = res;
      })
    );
  }

  update(body: Form): Observable<StatesModel> {
    return this.http.patch<StatesModel>(this.url, body).pipe(
      tap((res) => {
        console.log("StatesModel", res);
      })
    );
  }

  delete(id: string): Observable<any> {
    return this.http.delete(this.url + id + "/").pipe(
      tap((res) => {
        console.log("StatesModel", res);
      })
    );
  }

  filter(field: string): Observable<StatesModel[]> {
    let urlFilter = this.url + "?" + field;
    return this.http.get<StatesModel[]>(urlFilter).pipe(
      tap((res) => {
        console.log("StatesModel", res);
      })
    );
  }
}
