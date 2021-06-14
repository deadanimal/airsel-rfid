import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { HttpClient } from "@angular/common/http";
import { Form } from "@angular/forms";
import { tap } from "rxjs/operators";
import { Observable } from "rxjs";
import { AssetServiceHistoryModel } from './asset-service-history.model';

@Injectable({
  providedIn: "root",
})
export class AssetServiceHistoryService {
  url: string = environment.baseUrl + "v1/asset-service-history/";

  // Data
  public atmodels: AssetServiceHistoryModel[] = [];
  public atmodel: AssetServiceHistoryModel;

  constructor(private http: HttpClient) { }

  post(body): Observable<AssetServiceHistoryModel> {
    return this.http.post<any>(this.url, body).pipe(
      tap((res) => {
        console.log("AssetServiceHistoryModel", res);
      })
    );
  }

  get(): Observable<AssetServiceHistoryModel[]> {
    return this.http.get<any>(this.url).pipe(
      tap((res) => {
        console.log("AssetServiceHistoryModel", res);
        this.atmodels = res;
      })
    );
  }

  getOne(id: string): Observable<AssetServiceHistoryModel> {
    let urlID = this.url + id + "/";
    return this.http.get<AssetServiceHistoryModel>(urlID).pipe(
      tap((res: AssetServiceHistoryModel) => {
        console.log("AssetServiceHistoryModel", res);
        this.atmodel = res;
      })
    );
  }

  update(body: Form): Observable<AssetServiceHistoryModel> {
    return this.http.patch<AssetServiceHistoryModel>(this.url, body).pipe(
      tap((res) => {
        console.log("AssetServiceHistoryModel", res);
      })
    );
  }

  delete(id: string): Observable<any> {
    return this.http.delete(this.url + id + "/").pipe(
      tap((res) => {
        console.log("AssetServiceHistoryModel", res);
      })
    );
  }

  filter(field: string): Observable<AssetServiceHistoryModel[]> {
    let urlFilter = this.url + "?" + field;
    return this.http.get<AssetServiceHistoryModel[]>(urlFilter).pipe(
      tap((res) => {
        console.log("AssetServiceHistoryModel", res);
      })
    );
  }
}
