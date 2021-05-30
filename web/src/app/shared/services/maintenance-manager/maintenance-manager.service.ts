import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { HttpClient } from "@angular/common/http";
import { Form } from "@angular/forms";
import { tap } from "rxjs/operators";
import { Observable } from "rxjs";
import { MaintenanceManagerModel } from "./maintenance-manager.model";

@Injectable({
  providedIn: "root",
})
export class MaintenanceManagerService {
  url: string = environment.baseUrl + "v1/maintenance-manager/";

  // Data
  public atmodels: MaintenanceManagerModel[] = [];
  public atmodel: MaintenanceManagerModel;

  constructor(private http: HttpClient) {}

  post(body): Observable<MaintenanceManagerModel> {
    return this.http.post<any>(this.url, body).pipe(
      tap((res) => {
      })
    );
  }

  get(): Observable<MaintenanceManagerModel[]> {
    return this.http.get<any>(this.url).pipe(
      tap((res) => {
        this.atmodels = res;
      })
    );
  }

  getOne(id: string): Observable<MaintenanceManagerModel> {
    let urlID = this.url + id + "/";
    return this.http.get<MaintenanceManagerModel>(urlID).pipe(
      tap((res: MaintenanceManagerModel) => {
        this.atmodel = res;
      })
    );
  }

  update(body: Form): Observable<MaintenanceManagerModel> {
    return this.http.patch<MaintenanceManagerModel>(this.url, body).pipe(
      tap((res) => {
      })
    );
  }

  delete(id: string): Observable<any> {
    return this.http.delete(this.url + id + "/").pipe(
      tap((res) => {
      })
    );
  }

  filter(field: string): Observable<MaintenanceManagerModel[]> {
    let urlFilter = this.url + "?" + field + "/";
    return this.http.get<MaintenanceManagerModel[]>(urlFilter).pipe(
      tap((res) => {
      })
    );
  }
}
