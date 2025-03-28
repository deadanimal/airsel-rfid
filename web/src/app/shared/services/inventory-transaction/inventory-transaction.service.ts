import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { HttpClient } from "@angular/common/http";
import { Form } from "@angular/forms";
import { tap } from "rxjs/operators";
import { Observable } from "rxjs";
import { InventoryTransactionModel } from "./inventory-transaction.model";

@Injectable({
  providedIn: 'root'
})
export class InventoryTransactionService {

  url: string = environment.baseUrl + "v1/inventory-transaction/";

  // Data
  public amodels: InventoryTransactionModel[] = [];
  public amodel: InventoryTransactionModel;

  constructor(private http: HttpClient) { }

  get(): Observable<InventoryTransactionModel[]> {
    return this.http.get<any>(this.url).pipe(
      tap((res) => {
        console.log("InventoryTransactionModel", res);
        this.amodels = res;
      })
    );
  }

  update(id: string, body: Form): Observable<InventoryTransactionModel> {
    let urlTemp = this.url + id + '/'
    return this.http.patch<InventoryTransactionModel>(urlTemp, body).pipe(
      tap((res) => {
      })
    );
  }

  filter(field:string): Observable<InventoryTransactionModel[]> {
    let urlFilter = this.url + "?" + field + "/";
    return this.http.get<InventoryTransactionModel[]>(urlFilter).pipe(
      tap((res)=>{
      })
    );
  }

}
