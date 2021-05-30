import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { HttpClient } from "@angular/common/http";
import { Form } from "@angular/forms";
import { tap } from "rxjs/operators";
import { Observable } from "rxjs";
import { AssetAttributeModel } from "./asset-attribute.model";

@Injectable({
  providedIn: "root",
})
export class AssetAttributeService {
  url: string = environment.baseUrl + "v1/asset-attribute/";

  // Data
  public amodels: AssetAttributeModel[] = [];
  public amodel: AssetAttributeModel;

  constructor(private http: HttpClient) { }

  post(body): Observable<AssetAttributeModel> {
    return this.http.post<any>(this.url, body).pipe(
      tap((res) => {
        // console.log("AssetAttributeModel", res);
      })
    );
  }

  get(): Observable<AssetAttributeModel[]> {
    return this.http.get<any>(this.url).pipe(
      tap((res) => {
        // console.log("AssetAttributeModel", res);
        this.amodels = res;
      })
    );
  }

  getOne(id: string): Observable<AssetAttributeModel> {
    let urlID = this.url + id + "/";
    return this.http.get<AssetAttributeModel>(urlID).pipe(
      tap((res: AssetAttributeModel) => {
        // console.log("AssetAttributeModel", res);
        this.amodel = res;
      })
    );
  }

  // update(body): Observable<AssetAttributeModel> {
  //   return this.http.patch<AssetAttributeModel>(this.url, body).pipe(
  //     tap((res) => {
  //       console.log("AssetAttributeModel", res);
  //     })
  //   );
  // }

  update(id: string, body: Form): Observable<AssetAttributeModel> {
    let urlTemp = this.url + id + '/'
    return this.http.patch<AssetAttributeModel>(urlTemp, body).pipe(
      tap((res) => {
        // console.log("AssetAttributeModel", res);
      })
    );
  }

  delete(id: string): Observable<any> {
    return this.http.delete(this.url + id + "/").pipe(
      tap((res) => {
        console.log("AssetAttributeModel", res);
      })
    );
  }

  filter(field: string): Observable<AssetAttributeModel[]> {
    let urlFilter = this.url + "?" + field;
    return this.http.get<AssetAttributeModel[]>(urlFilter).pipe(
      tap((res) => {
        console.log("AssetAttributeModel", res);
      })
    );
  }

  patch_asset(body): Observable<AssetAttributeModel> {
    let urlPatchAsset = this.url + "patch_asset/";
    return this.http.post<any>(urlPatchAsset, body).pipe(
      tap((res) => {
        console.log("AssetAttributeModel", res);
      })
    );
  }
}
