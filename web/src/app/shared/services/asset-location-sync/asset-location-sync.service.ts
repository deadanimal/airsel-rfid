import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { HttpClient } from "@angular/common/http";
import { Form } from "@angular/forms";
import { tap } from "rxjs/operators";
import { Observable } from "rxjs";
import { AssetLocationSync } from "./asset-location-sync";

@Injectable({
  providedIn: "root",
})
export class AssetLocationSyncService {
  url: string = environment.baseUrl + "v1/asset-location-sync/";

  // Data
  public atmodels: AssetLocationSync[] = [];
  public atmodel: AssetLocationSync;

  constructor(private http: HttpClient) {}

  post(body): Observable<AssetLocationSync> {
    return this.http.post<any>(this.url, body).pipe(
      tap((res) => {
      })
    );
  }

  get(): Observable<AssetLocationSync[]> {
    return this.http.get<any>(this.url).pipe(
      tap((res) => {
        this.atmodels = res;
      })
    );
  }

  getOne(id: string): Observable<AssetLocationSync> {
    let urlID = this.url + id + "/";
    return this.http.get<AssetLocationSync>(urlID).pipe(
      tap((res: AssetLocationSync) => {
        this.atmodel = res;
      })
    );
  }

  update(body: Form): Observable<AssetLocationSync> {
    return this.http.patch<AssetLocationSync>(this.url, body).pipe(
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

  filter(field: string): Observable<AssetLocationSync[]> {
    let urlFilter = this.url + "?" + field + "/";
    return this.http.get<AssetLocationSync[]>(urlFilter).pipe(
      tap((res) => {
      })
    );
  }

  customGet(): Observable<AssetLocationSync[]> {
    return this.http.get<any>(this.url + "get_asset_location").pipe(
      tap((res) => {
      })
    );
  }


}
