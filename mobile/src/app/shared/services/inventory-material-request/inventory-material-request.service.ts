import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { HttpClient } from "@angular/common/http";
import { Form } from "@angular/forms";
import { tap } from "rxjs/operators";
import { Observable } from "rxjs";
import { InventoryMaterialRequestModel } from './inventory-material-request.model';

@Injectable({
  providedIn: "root",
})
export class InventoryMaterialRequestService {
  url: string = environment.baseUrl + "v1/inventory-material-request/";

  // Data
  public ormodels: InventoryMaterialRequestModel[] = [];
  public ormodel: InventoryMaterialRequestModel;

  constructor(private http: HttpClient) { }

  post(body: Form): Observable<InventoryMaterialRequestModel> {
    return this.http.post<any>(this.url, body).pipe(
      tap((res) => {
        console.log("InventoryMaterialRequestModel", res);
      })
    );
  }

  get(): Observable<InventoryMaterialRequestModel[]> {
    return this.http.get<any>(this.url).pipe(
      tap((res) => {
        console.log("InventoryMaterialRequestModel", res);
        this.ormodels = res;
      })
    );
  }

  getOne(id: string): Observable<InventoryMaterialRequestModel> {
    let urlID = this.url + id + "/";
    return this.http.get<InventoryMaterialRequestModel>(urlID).pipe(
      tap((res: InventoryMaterialRequestModel) => {
        console.log("InventoryMaterialRequestModel", res);
        this.ormodel = res;
      })
    );
  }

  update(id: string, body: Form): Observable<InventoryMaterialRequestModel> {
    return this.http.patch<InventoryMaterialRequestModel>(this.url + id + '/', body).pipe(
      tap((res) => {
        console.log("InventoryMaterialRequestModel", res);
      })
    );
  }

  delete(id: string): Observable<any> {
    return this.http.delete(this.url + id + "/").pipe(
      tap((res) => {
        console.log("InventoryMaterialRequestModel", res);
      })
    );
  }

  filter(field: string): Observable<InventoryMaterialRequestModel[]> {
    let urlFilter = this.url + "?" + field;
    return this.http.get<InventoryMaterialRequestModel[]>(urlFilter).pipe(
      tap((res) => {
        console.log("InventoryMaterialRequestModel", res);
      })
    );
  }
}
