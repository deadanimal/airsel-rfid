import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { HttpClient } from "@angular/common/http";
import { Form } from "@angular/forms";
import { tap } from "rxjs/operators";
import { Observable } from "rxjs";
import { InventoryGrnModel } from './inventory-grn.model';

@Injectable({
  providedIn: "root",
})
export class InventoryGrnService {
  url: string = environment.baseUrl + "v1/inventory-grn/";

  // Data
  public ormodels: InventoryGrnModel[] = [];
  public ormodel: InventoryGrnModel;

  constructor(private http: HttpClient) { }

  post(body: Form): Observable<InventoryGrnModel> {
    return this.http.post<any>(this.url, body).pipe(
      tap((res) => {
        console.log("InventoryGrnModel", res);
      })
    );
  }

  get(): Observable<InventoryGrnModel[]> {
    return this.http.get<any>(this.url).pipe(
      tap((res) => {
        console.log("InventoryGrnModel", res);
        this.ormodels = res;
      })
    );
  }

  getOne(id: string): Observable<InventoryGrnModel> {
    let urlID = this.url + id + "/";
    return this.http.get<InventoryGrnModel>(urlID).pipe(
      tap((res: InventoryGrnModel) => {
        console.log("InventoryGrnModel", res);
        this.ormodel = res;
      })
    );
  }

  update(id: string, body: Form): Observable<InventoryGrnModel> {
    return this.http.patch<InventoryGrnModel>(this.url + id + '/', body).pipe(
      tap((res) => {
        console.log("InventoryGrnModel", res);
      })
    );
  }

  delete(id: string): Observable<any> {
    return this.http.delete(this.url + id + "/").pipe(
      tap((res) => {
        console.log("InventoryGrnModel", res);
      })
    );
  }

  filter(field: string): Observable<InventoryGrnModel[]> {
    let urlFilter = this.url + "?" + field;
    return this.http.get<InventoryGrnModel[]>(urlFilter).pipe(
      tap((res) => {
        console.log("InventoryGrnModel", res);
      })
    );
  }
}
