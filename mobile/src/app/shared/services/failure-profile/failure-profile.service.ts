import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { HttpClient } from "@angular/common/http";
import { Form } from "@angular/forms";
import { tap } from "rxjs/operators";
import { Observable } from "rxjs";
import { FailureProfileModel } from './failure-profile.model';

@Injectable({
  providedIn: "root",
})
export class FailureProfileModelService {
  url: string = environment.baseUrl + "v1/failure-profile/";

  // Data
  public amodels: FailureProfileModel[] = [];
  public amodel: FailureProfileModel;

  constructor(private http: HttpClient) { }

  post(body): Observable<FailureProfileModel> {
    return this.http.post<any>(this.url, body).pipe(
      tap((res) => {
        console.log("FailureProfileModel", res);
      })
    );
  }

  get(): Observable<FailureProfileModel[]> {
    return this.http.get<any>(this.url).pipe(
      tap((res) => {
        console.log("FailureProfileModel", res);
        this.amodels = res;
      })
    );
  }

  getOne(id: string): Observable<FailureProfileModel> {
    let urlID = this.url + id + "/";
    return this.http.get<FailureProfileModel>(urlID).pipe(
      tap((res: FailureProfileModel) => {
        console.log("FailureProfileModel", res);
        this.amodel = res;
      })
    );
  }

  update(id: string, body): Observable<FailureProfileModel> {
    let urlTemp = this.url + id + '/'
    return this.http.patch<FailureProfileModel>(urlTemp, body).pipe(
      tap((res) => {
        console.log("FailureProfileModel", res);
      })
    );
  }

  delete(id: string): Observable<any> {
    return this.http.delete(this.url + id + "/").pipe(
      tap((res) => {
        console.log("FailureProfileModel", res);
      })
    );
  }

  filter(field: string): Observable<FailureProfileModel[]> {
    let urlFilter = this.url + "?" + field;
    return this.http.get<FailureProfileModel[]>(urlFilter).pipe(
      tap((res) => {
        console.log("FailureProfileModel", res);
      })
    );
  }
}
