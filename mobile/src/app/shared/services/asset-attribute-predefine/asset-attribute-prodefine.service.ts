import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { HttpClient } from "@angular/common/http";
import { Form } from "@angular/forms";
import { tap } from "rxjs/operators";
import { Observable } from "rxjs";
import { AssetAttributePredefineModel } from './asset-attribute-prodefine.model';

@Injectable({
  providedIn: "root",
})
export class AssetAttributePredefineService {
  url: string = environment.baseUrl + "v1/asset-attribute-predefine/";

  // Data
  public atmodels: AssetAttributePredefineModel[] = [];
  public atmodel: AssetAttributePredefineModel;

  constructor(private http: HttpClient) { }

  post(body): Observable<AssetAttributePredefineModel> {
    return this.http.post<any>(this.url, body).pipe(
      tap((res) => {
        console.log("AssetAttributePredefineModel", res);
      })
    );
  }

  get(): Observable<AssetAttributePredefineModel[]> {
    return this.http.get<any>(this.url).pipe(
      tap((res) => {
        console.log("AssetAttributePredefineModel", res);
        this.atmodels = res;
      })
    );
  }

  getOne(id: string): Observable<AssetAttributePredefineModel> {
    let urlID = this.url + id + "/";
    return this.http.get<AssetAttributePredefineModel>(urlID).pipe(
      tap((res: AssetAttributePredefineModel) => {
        console.log("AssetAttributePredefineModel", res);
        this.atmodel = res;
      })
    );
  }

  update(body: Form): Observable<AssetAttributePredefineModel> {
    return this.http.patch<AssetAttributePredefineModel>(this.url, body).pipe(
      tap((res) => {
        console.log("AssetAttributePredefineModel", res);
      })
    );
  }

  delete(id: string): Observable<any> {
    return this.http.delete(this.url + id + "/").pipe(
      tap((res) => {
        console.log("AssetAttributePredefineModel", res);
      })
    );
  }

  filter(field: string): Observable<AssetAttributePredefineModel[]> {
    let urlFilter = this.url + "?" + field;
    return this.http.get<AssetAttributePredefineModel[]>(urlFilter).pipe(
      tap((res) => {
        console.log("AssetAttributePredefineModel", res);
      })
    );
  }
}
