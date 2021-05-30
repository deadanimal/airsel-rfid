import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { HttpClient } from "@angular/common/http";
import { Form } from "@angular/forms";
import { tap } from "rxjs/operators";
import { Observable } from "rxjs";
import { AssetMaintenanceSpecModel } from "./asset-maintenance-spec.model";


@Injectable({
    providedIn:"root",
})
export class AssetMaintenanceSpecService {

    url: string = environment.baseUrl + "v1/asset-maintenance-spec/"

    //Data
    public atmodels: AssetMaintenanceSpecModel[] = [];
    public atmodel: AssetMaintenanceSpecModel;
  
    constructor(private http: HttpClient) {}
  
    post(body): Observable<AssetMaintenanceSpecModel> {
      return this.http.post<any>(this.url, body).pipe(
        tap((res) => {
        })
      );
    }
  
    get(): Observable<AssetMaintenanceSpecModel[]> {
      return this.http.get<any>(this.url).pipe(
        tap((res) => {
          this.atmodels = res;
        })
      );
    }
  
    getOne(id: string): Observable<AssetMaintenanceSpecModel> {
      let urlID = this.url + id + "/";
      return this.http.get<AssetMaintenanceSpecModel>(urlID).pipe(
        tap((res: AssetMaintenanceSpecModel) => {
          this.atmodel = res;
        })
      );
    }
  
    update(body: Form): Observable<AssetMaintenanceSpecModel> {
      return this.http.patch<AssetMaintenanceSpecModel>(this.url, body).pipe(
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
  
    filter(field: string): Observable<AssetMaintenanceSpecModel[]> {
      let urlFilter = this.url + "?" + field + "/";
      return this.http.get<AssetMaintenanceSpecModel[]>(urlFilter).pipe(
        tap((res) => {
        })
      );
    }
  }
  