import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { HttpClient } from "@angular/common/http";
import { Form } from "@angular/forms";
import { tap } from "rxjs/operators";
import { Observable } from "rxjs";
import { WorkClassModel } from './work-class.model';

@Injectable({
  providedIn: "root",
})
export class WorkClassService {
  url: string = environment.baseUrl + "v1/work-classes/";

  // Data
  public rmodels: WorkClassModel[] = [];
  public rmodel: WorkClassModel;

  constructor(private http: HttpClient) { }

  post(body: Form): Observable<WorkClassModel> {
    return this.http.post<any>(this.url, body).pipe(
      tap((res) => {
        console.log("WorkClassModel", res);
      })
    );
  }

  get(): Observable<WorkClassModel[]> {
    return this.http.get<any>(this.url).pipe(
      tap((res) => {
        console.log("WorkClassModel", res);
        this.rmodels = res;
      })
    );
  }

  getOne(id: string): Observable<WorkClassModel> {
    let urlID = this.url + id + "/";
    return this.http.get<WorkClassModel>(urlID).pipe(
      tap((res: WorkClassModel) => {
        console.log("WorkClassModel", res);
        this.rmodel = res;
      })
    );
  }

  update(body: Form): Observable<WorkClassModel> {
    return this.http.patch<WorkClassModel>(this.url, body).pipe(
      tap((res) => {
        console.log("WorkClassModel", res);
      })
    );
  }

  delete(id: string): Observable<any> {
    return this.http.delete(this.url + id + "/").pipe(
      tap((res) => {
        console.log("WorkClassModel", res);
      })
    );
  }

  filter(field: string): Observable<WorkClassModel[]> {
    let urlFilter = this.url + "?" + field;
    return this.http.get<WorkClassModel[]>(urlFilter).pipe(
      tap((res) => {
        console.log("WorkClassModel", res);
      })
    );
  }
}
