import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { HttpClient } from "@angular/common/http";
import { Form } from "@angular/forms";
import { tap } from "rxjs/operators";
import { Observable } from "rxjs";
import { InventoryItemIntraModel } from "./inventory-item-intra.model";

@Injectable({
  providedIn: "root",
})
export class InventoryItemIntraService {
  url: string = environment.baseUrl + "v1/inventory-item-intra/";

  // Data
  public ormodels: InventoryItemIntraModel[] = [];
  public ormodel: InventoryItemIntraModel;

  constructor(private http: HttpClient) { }

  post(body: Form): Observable<InventoryItemIntraModel> {
    return this.http.post<any>(this.url, body).pipe(
      tap((res) => {
        console.log("InventoryItemIntraModel", res);
      })
    );
  }

  get(): Observable<InventoryItemIntraModel[]> {
    return this.http.get<any>(this.url).pipe(
      tap((res) => {
        console.log("InventoryItemIntraModel", res);
        this.ormodels = res;
      })
    );
  }

  getOne(id: string): Observable<InventoryItemIntraModel> {
    let urlID = this.url + id + "/";
    return this.http.get<InventoryItemIntraModel>(urlID).pipe(
      tap((res: InventoryItemIntraModel) => {
        console.log("InventoryItemIntraModel", res);
        this.ormodel = res;
      })
    );
  }

  update(id: string, body: Form): Observable<InventoryItemIntraModel> {
    return this.http.patch<InventoryItemIntraModel>(this.url + id + '/', body).pipe(
      tap((res) => {
        console.log("InventoryItemIntraModel", res);
      })
    );
  }

  delete(id: string): Observable<any> {
    return this.http.delete(this.url + id + "/").pipe(
      tap((res) => {
        console.log("InventoryItemIntraModel", res);
      })
    );
  }

  filter(field: string): Observable<InventoryItemIntraModel[]> {
    let urlFilter = this.url + "?" + field;
    return this.http.get<InventoryItemIntraModel[]>(urlFilter).pipe(
      tap((res) => {
        console.log("InventoryItemIntraModel", res);
      })
    );
  }
}
