import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { HttpClient } from "@angular/common/http";
import { Form } from "@angular/forms";
import { tap } from "rxjs/operators";
import { Observable } from "rxjs";
import { AssetLocationAssetListServiceHistoriesModel } from './asset-location-asset-list-service-histories.model';

@Injectable({
  providedIn: "root",
})
export class AssetLocationAssetListServiceHistoriesService {
  url: string = environment.baseUrl + "v1/asset-location-asset-list-service-histories/";

  // Data
  public atmodels: AssetLocationAssetListServiceHistoriesModel[] = [];
  public atmodel: AssetLocationAssetListServiceHistoriesModel;

  constructor(private http: HttpClient) { }

  post(body): Observable<AssetLocationAssetListServiceHistoriesModel> {
    return this.http.post<any>(this.url, body).pipe(
      tap((res) => {
        console.log("AssetLocationAssetListServiceHistoriesModel", res);
      })
    );
  }

  get(): Observable<AssetLocationAssetListServiceHistoriesModel[]> {
    return this.http.get<any>(this.url).pipe(
      tap((res) => {
        console.log("AssetLocationAssetListServiceHistoriesModel", res);
        this.atmodels = res;
      })
    );
  }

  getOne(id: string): Observable<AssetLocationAssetListServiceHistoriesModel> {
    let urlID = this.url + id + "/";
    return this.http.get<AssetLocationAssetListServiceHistoriesModel>(urlID).pipe(
      tap((res: AssetLocationAssetListServiceHistoriesModel) => {
        console.log("AssetLocationAssetListServiceHistoriesModel", res);
        this.atmodel = res;
      })
    );
  }

  update(id, body): Observable<AssetLocationAssetListServiceHistoriesModel> {
    let urlID = this.url + id + "/";
    return this.http.patch<AssetLocationAssetListServiceHistoriesModel>(urlID, body).pipe(
      tap((res) => {
        console.log("AssetLocationAssetListServiceHistoriesModel", res);
      })
    );
  }

  delete(id: string): Observable<any> {
    return this.http.delete(this.url + id + "/").pipe(
      tap((res) => {
        console.log("AssetLocationAssetListServiceHistoriesModel", res);
      })
    );
  }

  filter(field: string): Observable<AssetLocationAssetListServiceHistoriesModel[]> {
    let urlFilter = this.url + "?" + field;
    return this.http.get<AssetLocationAssetListServiceHistoriesModel[]>(urlFilter).pipe(
      tap((res) => {
        console.log("AssetLocationAssetListServiceHistoriesModel", res);
      })
    );
  }
}
