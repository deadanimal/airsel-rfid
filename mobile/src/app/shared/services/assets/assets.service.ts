import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { HttpClient } from "@angular/common/http";
import { Form } from "@angular/forms";
import { tap } from "rxjs/operators";
import { Observable } from "rxjs";
import { AssetsModel } from "./assets.model";

@Injectable({
  providedIn: "root",
})
export class AssetsService {
  url: string = environment.baseUrl + "v1/assets/";

  // Data 
  public amodels: AssetsModel[] = [];
  public amodel: AssetsModel;

  constructor(private http: HttpClient) { }

  post(body): Observable<AssetsModel> {
    return this.http.post<any>(this.url, body).pipe(
      tap((res) => {
        console.log("AssetsModel", res);
      })
    );
  }

  get(): Observable<AssetsModel[]> {
    return this.http.get<any>(this.url).pipe(
      tap((res) => {
        console.log("AssetsModel", res);
        this.amodels = res;
      })
    );
  }

  getOne(id: string): Observable<AssetsModel> {
    let urlID = this.url + id + "/";
    return this.http.get<AssetsModel>(urlID).pipe(
      tap((res: AssetsModel) => {
        console.log("AssetsModel", res);
        this.amodel = res;
      })
    );
  }

  // update(body: Form): Observable<AssetsModel> {
  //   return this.http.patch<AssetsModel>(this.url, body).pipe(
  //     tap((res) => {
  //       console.log("AssetsModel", res);
  //     })
  //   );
  // }

  update(id: string, body): Observable<AssetsModel> {
    let urlTemp = this.url + id + '/'
    return this.http.patch<AssetsModel>(urlTemp, body).pipe(
      tap((res) => {
        console.log("AssetsModel", res);
      })
    );
  }

  delete(id: string): Observable<any> {
    return this.http.delete(this.url + id + "/").pipe(
      tap((res) => {
        console.log("AssetsModel", res);
      })
    );
  }

  filter(field: string): Observable<AssetsModel[]> {
    let urlFilter = this.url + "?" + field;
    return this.http.get<AssetsModel[]>(urlFilter).pipe(
      tap((res) => {
        console.log("AssetsModel", res);
      })
    );
  }

  getOneExtended(id: string): Observable<AssetsModel> {
    let urlID = this.url + id + "/extended/";
    return this.http.get<AssetsModel>(urlID).pipe(
      tap((res: AssetsModel) => {
        console.log("AssetsModel", res);
        this.amodel = res;
      })
    );
  }

  patch_asset(body): Observable<AssetsModel> {
    let urlPatchAsset = this.url + "patch_asset/";
    return this.http.post<any>(urlPatchAsset, body).pipe(
      tap((res) => {
        console.log("AssetsModel", res);
      })
    );
  }
}
