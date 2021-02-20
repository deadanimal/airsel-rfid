import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { HttpClient } from "@angular/common/http";
import { Form } from "@angular/forms";
import { tap } from "rxjs/operators";
import { Observable } from "rxjs";
import { InventoryItemInterModel } from "./inventory-item-inter.model";

@Injectable({
  providedIn: "root",
})
export class InventoryItemInterService {
  url: string = environment.baseUrl + "v1/inventory-item-inter/";

  // Data
  public ormodels: InventoryItemInterModel[] = [];
  public ormodel: InventoryItemInterModel;

  constructor(private http: HttpClient) { }

  post(body: Form): Observable<InventoryItemInterModel> {
    return this.http.post<any>(this.url, body).pipe(
      tap((res) => {
        console.log("InventoryItemInterModel", res);
      })
    );
  }

  get(): Observable<InventoryItemInterModel[]> {
    return this.http.get<any>(this.url).pipe(
      tap((res) => {
        console.log("InventoryItemInterModel", res);
        this.ormodels = res;
      })
    );
  }

  getOne(id: string): Observable<InventoryItemInterModel> {
    let urlID = this.url + id + "/";
    return this.http.get<InventoryItemInterModel>(urlID).pipe(
      tap((res: InventoryItemInterModel) => {
        console.log("InventoryItemInterModel", res);
        this.ormodel = res;
      })
    );
  }

  update(id: string, body: Form): Observable<InventoryItemInterModel> {
    return this.http.patch<InventoryItemInterModel>(this.url + id + '/', body).pipe(
      tap((res) => {
        console.log("InventoryItemInterModel", res);
      })
    );
  }

  delete(id: string): Observable<any> {
    return this.http.delete(this.url + id + "/").pipe(
      tap((res) => {
        console.log("InventoryItemInterModel", res);
      })
    );
  }

  filter(field: string): Observable<InventoryItemInterModel[]> {
    let urlFilter = this.url + "?" + field;
    return this.http.get<InventoryItemInterModel[]>(urlFilter).pipe(
      tap((res) => {
        console.log("InventoryItemInterModel", res);
      })
    );
  }
}
