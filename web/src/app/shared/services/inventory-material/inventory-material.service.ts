import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { HttpClient } from "@angular/common/http";
import { Form } from "@angular/forms";
import { tap } from "rxjs/operators";
import { Observable } from "rxjs";
import { InventoryMaterialModel } from "./inventory-material.model";

@Injectable({
  providedIn: 'root'
})
export class InventoryMaterialService {
  url: string = environment.baseUrl + "v1/inventory-material-request/";

  // Data
  public amodels: InventoryMaterialModel[] = [];
  public amodel: InventoryMaterialModel;

  constructor(private http: HttpClient) { }

  get(): Observable<InventoryMaterialModel[]> {
    return this.http.get<any>(this.url).pipe(
      tap((res) => {
        console.log("InventoryMaterialModel", res);
        this.amodels = res;
      })
    );
  }
}
