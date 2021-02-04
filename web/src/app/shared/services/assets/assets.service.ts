import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { HttpClient } from "@angular/common/http";
import { Form } from "@angular/forms";
import { tap } from "rxjs/operators";
import { Observable } from "rxjs";
import { AssetsModel } from "./assets.model";

@Injectable({
  providedIn: "root",
})
export class AssetsService {
  url: string = environment.baseUrl + "v1/assets/";

  // Data
  public amodels: AssetsModel[] = [];
  public amodel: AssetsModel;

  constructor(private http: HttpClient) {}

  post(body): Observable<AssetsModel> {
    return this.http.post<any>(this.url, body).pipe(
      tap((res) => {
      })
    );
  }

  get(): Observable<AssetsModel[]> {
    return this.http.get<any>(this.url).pipe(
      tap((res) => {
        this.amodels = res;
      })
    );
  }

  getOne(id: string): Observable<AssetsModel> {
    let urlID = this.url + id + "/";
    return this.http.get<AssetsModel>(urlID).pipe(
      tap((res: AssetsModel) => {
        this.amodel = res;
      })
    );
  }

  update(id: string, body: Form): Observable<AssetsModel> {
    let urlTemp = this.url + id + '/'
    return this.http.patch<AssetsModel>(urlTemp, body).pipe(
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

  filter(field: string): Observable<AssetsModel[]> {
    let urlFilter = this.url + "?" + field + "/";
    return this.http.get<AssetsModel[]>(urlFilter).pipe(
      tap((res) => {
      })
    );
  }
}
