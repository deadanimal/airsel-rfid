import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { HttpClient } from "@angular/common/http";
import { Form } from "@angular/forms";
import { tap } from "rxjs/operators";
import { Observable } from "rxjs";
import { AssetAttributeColumnModel } from "./asset-attribute-column.model";

@Injectable({
  providedIn: "root",
})
export class AssetAttributeColumnService {
  url: string = environment.baseUrl + "v1/asset-attribute-column/";

  // Data
  public amodels: AssetAttributeColumnModel[] = [];
  public amodel: AssetAttributeColumnModel;

  constructor(private http: HttpClient) { }

  post(body): Observable<AssetAttributeColumnModel> {
    return this.http.post<any>(this.url, body).pipe(
      tap((res) => {
        console.log("AssetAttributeColumnModel", res);
      })
    );
  }

  get(): Observable<AssetAttributeColumnModel[]> {
    return this.http.get<any>(this.url).pipe(
      tap((res) => {
        console.log("AssetAttributeColumnModel", res);
        this.amodels = res;
      })
    );
  }

  getOne(id: string): Observable<AssetAttributeColumnModel> {
    let urlID = this.url + id + "/";
    return this.http.get<AssetAttributeColumnModel>(urlID).pipe(
      tap((res: AssetAttributeColumnModel) => {
        console.log("AssetAttributeColumnModel", res);
        this.amodel = res;
      })
    );
  }

  update(body): Observable<AssetAttributeColumnModel> {
    return this.http.patch<AssetAttributeColumnModel>(this.url, body).pipe(
      tap((res) => {
        console.log("AssetAttributeColumnModel", res);
      })
    );
  }

  delete(id: string): Observable<any> {
    return this.http.delete(this.url + id + "/").pipe(
      tap((res) => {
        console.log("AssetAttributeColumnModel", res);
      })
    );
  }

  filter(field: string): Observable<AssetAttributeColumnModel[]> {
    let urlFilter = this.url + "?" + field;
    return this.http.get<AssetAttributeColumnModel[]>(urlFilter).pipe(
      tap((res) => {
        console.log("AssetAttributeColumnModel", res);
      })
    );
  }

  patch_asset(body): Observable<AssetAttributeColumnModel> {
    let urlPatchAsset = this.url + "patch_asset/";
    return this.http.post<any>(urlPatchAsset, body).pipe(
      tap((res) => {
        console.log("AssetAttributeColumnModel", res);
      })
    );
  }
}
