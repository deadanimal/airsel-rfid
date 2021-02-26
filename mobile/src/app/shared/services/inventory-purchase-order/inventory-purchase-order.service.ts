import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { HttpClient } from "@angular/common/http";
import { Form } from "@angular/forms";
import { tap } from "rxjs/operators";
import { Observable } from "rxjs";
import { InventoryPurchaseOrderModel } from "./inventory-purchase-order.model";

@Injectable({
  providedIn: "root",
})
export class InventoryPurchaseOrderService {
  url: string = environment.baseUrl + "v1/inventory-purchase-order/";

  // Data
  public ormodels: InventoryPurchaseOrderModel[] = [];
  public ormodel: InventoryPurchaseOrderModel;

  constructor(private http: HttpClient) { }

  post(body: Form): Observable<InventoryPurchaseOrderModel> {
    return this.http.post<any>(this.url, body).pipe(
      tap((res) => {
        console.log("InventoryPurchaseOrderModel", res);
      })
    );
  }

  get(): Observable<InventoryPurchaseOrderModel[]> {
    return this.http.get<any>(this.url).pipe(
      tap((res) => {
        console.log("InventoryPurchaseOrderModel", res);
        this.ormodels = res;
      })
    );
  }

  getOne(id: string): Observable<InventoryPurchaseOrderModel> {
    let urlID = this.url + id + "/";
    return this.http.get<InventoryPurchaseOrderModel>(urlID).pipe(
      tap((res: InventoryPurchaseOrderModel) => {
        console.log("InventoryPurchaseOrderModel", res);
        this.ormodel = res;
      })
    );
  }

  update(id: string, body: Form): Observable<InventoryPurchaseOrderModel> {
    return this.http.patch<InventoryPurchaseOrderModel>(this.url + id + '/', body).pipe(
      tap((res) => {
        console.log("InventoryPurchaseOrderModel", res);
      })
    );
  }

  delete(id: string): Observable<any> {
    return this.http.delete(this.url + id + "/").pipe(
      tap((res) => {
        console.log("InventoryPurchaseOrderModel", res);
      })
    );
  }

  filter(field: string): Observable<InventoryPurchaseOrderModel[]> {
    let urlFilter = this.url + "?" + field;
    return this.http.get<InventoryPurchaseOrderModel[]>(urlFilter).pipe(
      tap((res) => {
        console.log("InventoryPurchaseOrderModel", res);
      })
    );
  }
}
