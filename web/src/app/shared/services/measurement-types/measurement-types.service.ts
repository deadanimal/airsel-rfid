import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { HttpClient } from "@angular/common/http";
import { Form } from "@angular/forms";
import { tap } from "rxjs/operators";
import { Observable } from "rxjs";
import { MeasurementTypesModel } from "./measurement-types.model";

@Injectable({
  providedIn: "root",
})
export class MeasurementTypesService {
  url: string = environment.baseUrl + "v1/measurement-types/";

  // Data
  public atmodels: MeasurementTypesModel[] = [];
  public atmodel: MeasurementTypesModel;

  constructor(private http: HttpClient) {}

  post(body): Observable<MeasurementTypesModel> {
    return this.http.post<any>(this.url, body).pipe(
      tap((res) => {
      })
    );
  }

  get(): Observable<MeasurementTypesModel[]> {
    return this.http.get<any>(this.url).pipe(
      tap((res) => {
        this.atmodels = res;
      })
    );
  }

  getOne(id: string): Observable<MeasurementTypesModel> {
    let urlID = this.url + id + "/";
    return this.http.get<MeasurementTypesModel>(urlID).pipe(
      tap((res: MeasurementTypesModel) => {
        this.atmodel = res;
      })
    );
  }

  update(body: Form): Observable<MeasurementTypesModel> {
    return this.http.patch<MeasurementTypesModel>(this.url, body).pipe(
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

  filter(field: string): Observable<MeasurementTypesModel[]> {
    let urlFilter = this.url + "?" + field + "/";
    return this.http.get<MeasurementTypesModel[]>(urlFilter).pipe(
      tap((res) => {
      })
    );
  }
}
