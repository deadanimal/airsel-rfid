import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { HttpClient } from "@angular/common/http";
import { Form } from "@angular/forms";
import { tap } from "rxjs/operators";
import { Observable } from "rxjs";
import { AssetRegistrationsModel } from "./asset-registrations.model";

@Injectable({
  providedIn: "root",
})
export class AssetRegistrationsService {
  url: string = environment.baseUrl + "v1/asset-registration/";

  // Data
  public amodels: AssetRegistrationsModel[] = [];
  public amodel: AssetRegistrationsModel;

  constructor(private http: HttpClient) {}

  post(body): Observable<AssetRegistrationsModel> {
    return this.http.post<any>(this.url, body).pipe(
      tap((res) => {
        console.log("AssetRegistrationsModel", res);
      })
    );
  }

  get(): Observable<AssetRegistrationsModel[]> {
    return this.http.get<any>(this.url).pipe(
      tap((res) => {
        console.log("AssetRegistrationsModel", res);
        this.amodels = res;
      })
    );
  }

  getOne(id: string): Observable<AssetRegistrationsModel> {
    let urlID = this.url + id + "/";
    return this.http.get<AssetRegistrationsModel>(urlID).pipe(
      tap((res: AssetRegistrationsModel) => {
        console.log("AssetRegistrationsModel", res);
        this.amodel = res;
      })
    );
  }

  update(body): Observable<AssetRegistrationsModel> {
    return this.http.patch<AssetRegistrationsModel>(this.url, body).pipe(
      tap((res) => {
        console.log("AssetRegistrationsModel", res);
      })
    );
  }

  delete(id: string): Observable<any> {
    return this.http.delete(this.url + id + "/").pipe(
      tap((res) => {
        console.log("AssetRegistrationsModel", res);
      })
    );
  }

  filter(field: string): Observable<AssetRegistrationsModel[]> {
    let urlFilter = this.url + "?" + field;
    return this.http.get<AssetRegistrationsModel[]>(urlFilter).pipe(
      tap((res) => {
        console.log("AssetRegistrationsModel", res);
      })
    );
  }

  patch_asset(body): Observable<AssetRegistrationsModel> {
    let urlPatchAsset = this.url + "patch_asset/";
    return this.http.post<any>(urlPatchAsset, body).pipe(
      tap((res) => {
        console.log("AssetRegistrationsModel", res);
      })
    );
  }
}
