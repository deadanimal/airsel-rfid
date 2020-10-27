import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { HttpClient } from "@angular/common/http";
import { Form } from "@angular/forms";
import { tap } from "rxjs/operators";
import { Observable } from "rxjs";
import { AssetTypesModel } from "./asset-types.model";

@Injectable({
  providedIn: "root",
})
export class AssetTypesService {
  url: string = environment.baseUrl + "v1/asset-types/";

  // Data
  public atmodels: AssetTypesModel[] = [];
  public atmodel: AssetTypesModel;

  constructor(private http: HttpClient) {}

  post(body): Observable<AssetTypesModel> {
    return this.http.post<any>(this.url, body).pipe(
      tap((res) => {
        console.log("AssetTypesModel", res);
      })
    );
  }

  get(): Observable<AssetTypesModel[]> {
    return this.http.get<any>(this.url).pipe(
      tap((res) => {
        console.log("AssetTypesModel", res);
        this.atmodels = res;
      })
    );
  }

  getOne(id: string): Observable<AssetTypesModel> {
    let urlID = this.url + id + "/";
    return this.http.get<AssetTypesModel>(urlID).pipe(
      tap((res: AssetTypesModel) => {
        console.log("AssetTypesModel", res);
        this.atmodel = res;
      })
    );
  }

  update(body: Form): Observable<AssetTypesModel> {
    return this.http.patch<AssetTypesModel>(this.url, body).pipe(
      tap((res) => {
        console.log("AssetTypesModel", res);
      })
    );
  }

  delete(id: string): Observable<any> {
    return this.http.delete(this.url + id + "/").pipe(
      tap((res) => {
        console.log("AssetTypesModel", res);
      })
    );
  }

  filter(field: string): Observable<AssetTypesModel[]> {
    let urlFilter = this.url + "?" + field;
    return this.http.get<AssetTypesModel[]>(urlFilter).pipe(
      tap((res) => {
        console.log("AssetTypesModel", res);
      })
    );
  }
}
