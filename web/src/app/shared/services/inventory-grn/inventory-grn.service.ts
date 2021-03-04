import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { HttpClient } from "@angular/common/http";
import { Form } from "@angular/forms";
import { tap } from "rxjs/operators";
import { Observable } from "rxjs";
import { InventoryGrnModel } from "./inventory-grn.model";

@Injectable({
  providedIn: 'root'
})
export class InventoryGrnService {
  url: string = environment.baseUrl + "v1/inventory-grn/";

  // Data
  public amodels: InventoryGrnModel[] = [];
  public amodel: InventoryGrnModel;

  constructor(private http: HttpClient) { }

  get(): Observable<InventoryGrnModel[]> {
    return this.http.get<any>(this.url).pipe(
      tap((res) => {
        console.log("InventoryGrnModel", res);
        this.amodels = res;
      })
    );
  }

}
