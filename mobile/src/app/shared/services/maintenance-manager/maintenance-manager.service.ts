import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { HttpClient } from "@angular/common/http";
import { Form } from "@angular/forms";
import { tap } from "rxjs/operators";
import { Observable } from "rxjs";
import { MaintenanceManagerModel } from './maintenance-manager.model';

@Injectable({
  providedIn: "root",
})
export class MaintenanceManagerService {
  url: string = environment.baseUrl + "v1/maintenance-manager/";

  // Data
  public rmodels: MaintenanceManagerModel[] = [];
  public rmodel: MaintenanceManagerModel;

  constructor(private http: HttpClient) { }

  post(body: Form): Observable<MaintenanceManagerModel> {
    return this.http.post<any>(this.url, body).pipe(
      tap((res) => {
        console.log("MaintenanceManagerModel", res);
      })
    );
  }

  get(): Observable<MaintenanceManagerModel[]> {
    return this.http.get<any>(this.url).pipe(
      tap((res) => {
        console.log("MaintenanceManagerModel", res);
        this.rmodels = res;
      })
    );
  }

  getOne(id: string): Observable<MaintenanceManagerModel> {
    let urlID = this.url + id + "/";
    return this.http.get<MaintenanceManagerModel>(urlID).pipe(
      tap((res: MaintenanceManagerModel) => {
        console.log("MaintenanceManagerModel", res);
        this.rmodel = res;
      })
    );
  }

  update(body: Form): Observable<MaintenanceManagerModel> {
    return this.http.patch<MaintenanceManagerModel>(this.url, body).pipe(
      tap((res) => {
        console.log("MaintenanceManagerModel", res);
      })
    );
  }

  delete(id: string): Observable<any> {
    return this.http.delete(this.url + id + "/").pipe(
      tap((res) => {
        console.log("MaintenanceManagerModel", res);
      })
    );
  }

  filter(field: string): Observable<MaintenanceManagerModel[]> {
    let urlFilter = this.url + "?" + field;
    return this.http.get<MaintenanceManagerModel[]>(urlFilter).pipe(
      tap((res) => {
        console.log("MaintenanceManagerModel", res);
      })
    );
  }
}
