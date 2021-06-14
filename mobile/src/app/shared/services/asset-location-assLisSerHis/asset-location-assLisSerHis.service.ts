import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { HttpClient } from "@angular/common/http";
import { Form } from "@angular/forms";
import { tap } from "rxjs/operators";
import { Observable } from "rxjs";
import { AssetLocAssLisSerHisModel } from "./asset-location-assLisSerHis.model";

@Injectable({
  providedIn: "root",
})
export class AssetLocationAssLisSerHisService {
  url: string = environment.baseUrl + "v1/work-order-activity-completion-asset-location-asset-list/";

  // Data
  public atmodels: AssetLocAssLisSerHisModel[] = [];
  public atmodel: AssetLocAssLisSerHisModel;

  constructor(private http: HttpClient) { }

  post(body): Observable<AssetLocAssLisSerHisModel> {
    return this.http.post<any>(this.url, body).pipe(
      tap((res) => {
        console.log("AssetLocAssLisSerHisModel", res);
      })
    );
  }

  get(): Observable<AssetLocAssLisSerHisModel[]> {
    return this.http.get<any>(this.url).pipe(
      tap((res) => {
        console.log("AssetLocAssLisSerHisModel", res);
        this.atmodels = res;
      })
    );
  }

  getOne(id: string): Observable<AssetLocAssLisSerHisModel> {
    let urlID = this.url + id + "/";
    return this.http.get<AssetLocAssLisSerHisModel>(urlID).pipe(
      tap((res: AssetLocAssLisSerHisModel) => {
        console.log("AssetLocAssLisSerHisModel", res);
        this.atmodel = res;
      })
    );
  }

  update(body: Form): Observable<AssetLocAssLisSerHisModel> {
    return this.http.patch<AssetLocAssLisSerHisModel>(this.url, body).pipe(
      tap((res) => {
        console.log("AssetLocAssLisSerHisModel", res);
      })
    );
  }

  delete(id: string): Observable<any> {
    return this.http.delete(this.url + id + "/").pipe(
      tap((res) => {
        console.log("AssetLocAssLisSerHisModel", res);
      })
    );
  }

  filter(field: string): Observable<AssetLocAssLisSerHisModel[]> {
    let urlFilter = this.url + "?" + field;
    return this.http.get<AssetLocAssLisSerHisModel[]>(urlFilter).pipe(
      tap((res) => {
        console.log("AssetLocAssLisSerHisModel", res);
      })
    );
  }
}
