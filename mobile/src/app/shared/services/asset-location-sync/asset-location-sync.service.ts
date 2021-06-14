import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { HttpClient } from "@angular/common/http";
import { Form } from "@angular/forms";
import { tap } from "rxjs/operators";
import { Observable } from "rxjs";
import { AssetLocatioSyncModel } from "./asset-location-sync.model";

@Injectable({
  providedIn: "root",
})
export class AssetLocatioSyncService {
  url: string = environment.baseUrl + "v1/asset-location-sync/";

  // Data
  public atmodels: AssetLocatioSyncModel[] = [];
  public atmodel: AssetLocatioSyncModel;

  constructor(private http: HttpClient) { }

  post(body): Observable<AssetLocatioSyncModel> {
    return this.http.post<any>(this.url, body).pipe(
      tap((res) => {
        console.log("AssetLocatioSyncModel", res);
      })
    );
  }

  get(): Observable<AssetLocatioSyncModel[]> {
    return this.http.get<any>(this.url).pipe(
      tap((res) => {
        console.log("AssetLocatioSyncModel", res);
        this.atmodels = res;
      })
    );
  }

  getOne(id: string): Observable<AssetLocatioSyncModel> {
    let urlID = this.url + id + "/";
    return this.http.get<AssetLocatioSyncModel>(urlID).pipe(
      tap((res: AssetLocatioSyncModel) => {
        console.log("AssetLocatioSyncModel", res);
        this.atmodel = res;
      })
    );
  }

  update(body: Form): Observable<AssetLocatioSyncModel> {
    return this.http.patch<AssetLocatioSyncModel>(this.url, body).pipe(
      tap((res) => {
        console.log("AssetLocatioSyncModel", res);
      })
    );
  }

  delete(id: string): Observable<any> {
    return this.http.delete(this.url + id + "/").pipe(
      tap((res) => {
        console.log("AssetLocatioSyncModel", res);
      })
    );
  }

  filter(field: string): Observable<AssetLocatioSyncModel[]> {
    let urlFilter = this.url + "?" + field;
    return this.http.get<AssetLocatioSyncModel[]>(urlFilter).pipe(
      tap((res) => {
        console.log("AssetLocatioSyncModel", res);
      })
    );
  }

  get_asset_location(): Observable<AssetLocatioSyncModel[]> {
    let urlget = this.url + "get_asset_location/";
    console.log("urlget = ", urlget)
    return this.http.get<any>(urlget).pipe(
      tap((res) => {
        console.log("AssetLocatioSyncModel", res);
        this.atmodels = res;
      })
    );
  }

}
