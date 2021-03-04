import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { HttpClient } from "@angular/common/http";
import { Form } from "@angular/forms";
import { tap } from "rxjs/operators";
import { Observable } from "rxjs";
import { InventoryPurchaseOrderModel } from "./inventory-purchase-order.model";

@Injectable({
  providedIn: 'root'
})
export class InventoryPurchaseOrderService {
  url: string = environment.baseUrl + "v1/inventory-purchase-order/";

  // Data
  public amodels: InventoryPurchaseOrderModel[] = [];
  public amodel: InventoryPurchaseOrderModel;

  constructor(private http: HttpClient) { }

  get(): Observable<InventoryPurchaseOrderModel[]> {
    return this.http.get<any>(this.url).pipe(
      tap((res) => {
        console.log("InventoryPurchaseOrderModel", res);
        this.amodels = res;
      })
    );
  }

  // update(id: string, body: Form): Observable<InventoryPurchaseOrderModel[]> {
  //   let urlTemp = this.url + id + '/'
  //   return this.http.patch<InventoryPurchaseOrderModel>(urlTemp, body).pipe(
  //     tap((res) => {
  //       console.log("InventoryPurchaseOrderModel", res);
  //     })
  //   );
  // }
}
