import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { HttpClient } from "@angular/common/http";
import { Form } from "@angular/forms";
import { tap } from "rxjs/operators";
import { Observable } from "rxjs";
import { WorkCategoryModel } from './work-categories.model';

@Injectable({
  providedIn: "root",
})
export class WorkCategoryService {
  url: string = environment.baseUrl + "v1/work-categories/";

  // Data
  public rmodels: WorkCategoryModel[] = [];
  public rmodel: WorkCategoryModel;

  constructor(private http: HttpClient) { }

  post(body: Form): Observable<WorkCategoryModel> {
    return this.http.post<any>(this.url, body).pipe(
      tap((res) => {
        console.log("WorkCategoryModel", res);
      })
    );
  }

  get(): Observable<WorkCategoryModel[]> {
    return this.http.get<any>(this.url).pipe(
      tap((res) => {
        console.log("WorkCategoryModel", res);
        this.rmodels = res;
      })
    );
  }

  getOne(id: string): Observable<WorkCategoryModel> {
    let urlID = this.url + id + "/";
    return this.http.get<WorkCategoryModel>(urlID).pipe(
      tap((res: WorkCategoryModel) => {
        console.log("WorkCategoryModel", res);
        this.rmodel = res;
      })
    );
  }

  update(body: Form): Observable<WorkCategoryModel> {
    return this.http.patch<WorkCategoryModel>(this.url, body).pipe(
      tap((res) => {
        console.log("WorkCategoryModel", res);
      })
    );
  }

  delete(id: string): Observable<any> {
    return this.http.delete(this.url + id + "/").pipe(
      tap((res) => {
        console.log("WorkCategoryModel", res);
      })
    );
  }

  filter(field: string): Observable<WorkCategoryModel[]> {
    let urlFilter = this.url + "?" + field;
    return this.http.get<WorkCategoryModel[]>(urlFilter).pipe(
      tap((res) => {
        console.log("WorkCategoryModel", res);
      })
    );
  }
}
