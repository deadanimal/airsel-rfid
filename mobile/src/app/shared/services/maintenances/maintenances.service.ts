import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { HttpClient } from "@angular/common/http";
import { Form } from "@angular/forms";
import { tap } from "rxjs/operators";
import { Observable } from "rxjs";
import { MaintenancesModel } from "./maintenances.model";

@Injectable({
  providedIn: "root",
})
export class MaintenancesService {
  url: string = environment.baseUrl + "v1/maintenances/";

  // Data
  public mmodels: MaintenancesModel[] = [];
  public mmodel: MaintenancesModel;

  constructor(private http: HttpClient) {}

  post(body: Form): Observable<MaintenancesModel> {
    return this.http.post<any>(this.url, body).pipe(
      tap((res) => {
        console.log("MaintenancesModel", res);
      })
    );
  }

  get(): Observable<MaintenancesModel[]> {
    return this.http.get<any>(this.url).pipe(
      tap((res) => {
        console.log("MaintenancesModel", res);
        this.mmodels = res;
      })
    );
  }

  getOne(id: string): Observable<MaintenancesModel> {
    let urlID = this.url + id + "/";
    return this.http.get<MaintenancesModel>(urlID).pipe(
      tap((res: MaintenancesModel) => {
        console.log("MaintenancesModel", res);
        this.mmodel = res;
      })
    );
  }

  update(body: Form): Observable<MaintenancesModel> {
    return this.http.patch<MaintenancesModel>(this.url, body).pipe(
      tap((res) => {
        console.log("MaintenancesModel", res);
      })
    );
  }

  delete(id: string): Observable<any> {
    return this.http.delete(this.url + id + "/").pipe(
      tap((res) => {
        console.log("MaintenancesModel", res);
      })
    );
  }

  filter(field: string): Observable<MaintenancesModel[]> {
    let urlFilter = this.url + "?" + field;
    return this.http.get<MaintenancesModel[]>(urlFilter).pipe(
      tap((res) => {
        console.log("MaintenancesModel", res);
      })
    );
  }
}
