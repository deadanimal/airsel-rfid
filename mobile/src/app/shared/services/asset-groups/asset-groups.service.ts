import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { HttpClient } from "@angular/common/http";
import { Form } from "@angular/forms";
import { tap } from "rxjs/operators";
import { Observable } from "rxjs";
import { AssetGroupsModel } from "./asset-groups.model";

@Injectable({
  providedIn: "root",
})
export class AssetGroupsService {
  url: string = environment.baseUrl + "v1/asset-groups/";

  // Data
  public agmodels: AssetGroupsModel[] = [];
  public agmodel: AssetGroupsModel;

  constructor(private http: HttpClient) {}

  post(body): Observable<AssetGroupsModel> {
    return this.http.post<any>(this.url, body).pipe(
      tap((res) => {
        console.log("AssetGroupsModel", res);
      })
    );
  }

  get(): Observable<AssetGroupsModel[]> {
    return this.http.get<any>(this.url).pipe(
      tap((res) => {
        console.log("AssetGroupsModel", res);
        this.agmodels = res;
      })
    );
  }

  getOne(id: string): Observable<AssetGroupsModel> {
    let urlID = this.url + id + "/";
    return this.http.get<AssetGroupsModel>(urlID).pipe(
      tap((res: AssetGroupsModel) => {
        console.log("AssetGroupsModel", res);
        this.agmodel = res;
      })
    );
  }

  update(body: Form): Observable<AssetGroupsModel> {
    return this.http.patch<AssetGroupsModel>(this.url, body).pipe(
      tap((res) => {
        console.log("AssetGroupsModel", res);
      })
    );
  }

  delete(id: string): Observable<any> {
    return this.http.delete(this.url + id + "/").pipe(
      tap((res) => {
        console.log("AssetGroupsModel", res);
      })
    );
  }

  filter(field: string): Observable<AssetGroupsModel[]> {
    let urlFilter = this.url + "?" + field;
    return this.http.get<AssetGroupsModel[]>(urlFilter).pipe(
      tap((res) => {
        console.log("AssetGroupsModel", res);
      })
    );
  }
}
