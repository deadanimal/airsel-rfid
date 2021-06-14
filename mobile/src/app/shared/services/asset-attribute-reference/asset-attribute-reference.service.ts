import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { HttpClient } from "@angular/common/http";
import { Form } from "@angular/forms";
import { tap } from "rxjs/operators";
import { Observable } from "rxjs";
import { AssetAttributeReferenceModel } from './asset-attribute-reference.model';

@Injectable({
  providedIn: "root",
})
export class AssetAttributeReferenceService {
  url: string = environment.baseUrl + "v1/asset-attribute-reference/";

  // Data
  public atmodels: AssetAttributeReferenceModel[] = [];
  public atmodel: AssetAttributeReferenceModel;

  constructor(private http: HttpClient) { }

  post(body): Observable<AssetAttributeReferenceModel> {
    return this.http.post<any>(this.url, body).pipe(
      tap((res) => {
        console.log("AssetAttributeReferenceModel", res);
      })
    );
  }

  get(): Observable<AssetAttributeReferenceModel[]> {
    return this.http.get<any>(this.url).pipe(
      tap((res) => {
        console.log("AssetAttributeReferenceModel", res);
        this.atmodels = res;
      })
    );
  }

  getOne(id: string): Observable<AssetAttributeReferenceModel> {
    let urlID = this.url + id + "/";
    return this.http.get<AssetAttributeReferenceModel>(urlID).pipe(
      tap((res: AssetAttributeReferenceModel) => {
        console.log("AssetAttributeReferenceModel", res);
        this.atmodel = res;
      })
    );
  }

  update(body: Form): Observable<AssetAttributeReferenceModel> {
    return this.http.patch<AssetAttributeReferenceModel>(this.url, body).pipe(
      tap((res) => {
        console.log("AssetAttributeReferenceModel", res);
      })
    );
  }

  delete(id: string): Observable<any> {
    return this.http.delete(this.url + id + "/").pipe(
      tap((res) => {
        console.log("AssetAttributeReferenceModel", res);
      })
    );
  }

  filter(field: string): Observable<AssetAttributeReferenceModel[]> {
    let urlFilter = this.url + "?" + field;
    return this.http.get<AssetAttributeReferenceModel[]>(urlFilter).pipe(
      tap((res) => {
        console.log("AssetAttributeReferenceModel", res);
      })
    );
  }
}
