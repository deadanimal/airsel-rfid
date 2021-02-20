import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { HttpClient } from "@angular/common/http";
import { Form } from "@angular/forms";
import { tap } from "rxjs/operators";
import { Observable } from "rxjs";
import { InventoryItemModel } from "./inventory-item.model";

@Injectable({
  providedIn: "root",
})
export class InventoryItemService {
  url: string = environment.baseUrl + "v1/inventory-item/";

  // Data
  public ormodels: InventoryItemModel[] = [];
  public ormodel: InventoryItemModel;

  constructor(private http: HttpClient) { }

  post(body: Form): Observable<InventoryItemModel> {
    return this.http.post<any>(this.url, body).pipe(
      tap((res) => {
        console.log("InventoryItemModel", res);
      })
    );
  }

  get(): Observable<InventoryItemModel[]> {
    return this.http.get<any>(this.url).pipe(
      tap((res) => {
        console.log("InventoryItemModel", res);
        this.ormodels = res;
      })
    );
  }

  getOne(id: string): Observable<InventoryItemModel> {
    let urlID = this.url + id + "/";
    return this.http.get<InventoryItemModel>(urlID).pipe(
      tap((res: InventoryItemModel) => {
        console.log("InventoryItemModel", res);
        this.ormodel = res;
      })
    );
  }

  update(id: string, body: Form): Observable<InventoryItemModel> {
    return this.http.patch<InventoryItemModel>(this.url + id + '/', body).pipe(
      tap((res) => {
        console.log("InventoryItemModel", res);
      })
    );
  }

  delete(id: string): Observable<any> {
    return this.http.delete(this.url + id + "/").pipe(
      tap((res) => {
        console.log("InventoryItemModel", res);
      })
    );
  }

  filter(field: string): Observable<InventoryItemModel[]> {
    let urlFilter = this.url + "?" + field;
    return this.http.get<InventoryItemModel[]>(urlFilter).pipe(
      tap((res) => {
        console.log("InventoryItemModel", res);
      })
    );
  }
}
