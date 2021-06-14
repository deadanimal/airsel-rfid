import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { HttpClient } from "@angular/common/http";
import { Form } from "@angular/forms";
import { tap } from "rxjs/operators";
import { Observable } from "rxjs";
import { MeasurementtypeModel } from './measurement-type.model';

@Injectable({
  providedIn: "root",
})
export class MeasuremettypeService {
  url: string = environment.baseUrl + "v1/owning-organizations/";

  // Data
  public rmodels: MeasurementtypeModel[] = [];
  public rmodel: MeasurementtypeModel;

  constructor(private http: HttpClient) { }

  post(body: Form): Observable<MeasurementtypeModel> {
    return this.http.post<any>(this.url, body).pipe(
      tap((res) => {
        console.log("MeasurementtypeModel", res);
      })
    );
  }

  get(): Observable<MeasurementtypeModel[]> {
    return this.http.get<any>(this.url).pipe(
      tap((res) => {
        console.log("MeasurementtypeModel", res);
        this.rmodels = res;
      })
    );
  }

  getOne(id: string): Observable<MeasurementtypeModel> {
    let urlID = this.url + id + "/";
    return this.http.get<MeasurementtypeModel>(urlID).pipe(
      tap((res: MeasurementtypeModel) => {
        console.log("MeasurementtypeModel", res);
        this.rmodel = res;
      })
    );
  }

  update(body: Form): Observable<MeasurementtypeModel> {
    return this.http.patch<MeasurementtypeModel>(this.url, body).pipe(
      tap((res) => {
        console.log("MeasurementtypeModel", res);
      })
    );
  }

  delete(id: string): Observable<any> {
    return this.http.delete(this.url + id + "/").pipe(
      tap((res) => {
        console.log("MeasurementtypeModel", res);
      })
    );
  }

  filter(field: string): Observable<MeasurementtypeModel[]> {
    let urlFilter = this.url + "?" + field;
    return this.http.get<MeasurementtypeModel[]>(urlFilter).pipe(
      tap((res) => {
        console.log("MeasurementtypeModel", res);
      })
    );
  }
}
