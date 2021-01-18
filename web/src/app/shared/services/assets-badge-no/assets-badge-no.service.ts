import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { HttpClient } from "@angular/common/http";
import { Form } from "@angular/forms";
import { tap } from "rxjs/operators";
import { Observable } from "rxjs";
import { AssetsBadgeNoModel } from "./assets-badge-no.model";

@Injectable({
  providedIn: "root",
})
export class AssetsBadgeNoService {
  url: string = environment.baseUrl + "v1/asset-badge-format/";

  // Data
  public amodels: AssetsBadgeNoModel[] = [];
  public amodel: AssetsBadgeNoModel;

  constructor(private http: HttpClient) { }

  create(body): Observable<AssetsBadgeNoModel> {
    return this.http.post<any>(this.url, body).pipe(
      tap((res) => {
        console.log("AssetsBadgeNoModel", res);
      })
    );
  }

  getAll(): Observable<AssetsBadgeNoModel[]> {
    return this.http.get<any>(this.url).pipe(
      tap((res) => {
        console.log("AssetsBadgeNoModel", res);
        this.amodels = res;
      })
    );
  }

  getOne(id: string): Observable<AssetsBadgeNoModel> {
    let urlID = this.url + id + "/";
    return this.http.get<AssetsBadgeNoModel>(urlID).pipe(
      tap((res: AssetsBadgeNoModel) => {
        console.log("AssetsBadgeNoModel", res);
        this.amodel = res;
      })
    );
  }

  update(id: string, body: Form): Observable<AssetsBadgeNoModel> {
    let urlTemp = this.url + id + '/'
    return this.http.patch<AssetsBadgeNoModel>(urlTemp, body).pipe(
      tap((res) => {
        console.log("AssetsBadgeNoModel", res);
      })
    );
  }

  delete(id: string): Observable<any> {
    return this.http.delete(this.url + id + "/").pipe(
      tap((res) => {
        console.log("AssetsBadgeNoModel", res);
      })
    );
  }

  filter(field: string): Observable<AssetsBadgeNoModel[]> {
    let urlFilter = this.url + "?" + field;
    // console.log('urlFilter = ', urlFilter)
    return this.http.get<AssetsBadgeNoModel[]>(urlFilter).pipe(
      tap((res) => {
        console.log("AssetsBadgeNoModel", res);
      })
    );
  }
}
