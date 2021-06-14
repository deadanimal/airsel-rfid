import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { HttpClient } from "@angular/common/http";
import { Form } from "@angular/forms";
import { tap } from "rxjs/operators";
import { Observable } from "rxjs";
import { EmployeeModel } from "./employee.model";

@Injectable({
  providedIn: "root",
})
export class EmployeeService {
  url: string = environment.baseUrl + "v1/employee/";

  // Data
  public emodels: EmployeeModel[] = [];
  public emodel: EmployeeModel;

  constructor(private http: HttpClient) {}

  post(body): Observable<EmployeeModel> {
    return this.http.post<any>(this.url, body).pipe(
      tap((res) => {
        console.log("EmployeeModel", res);
      })
    );
  }

  get(): Observable<EmployeeModel[]> {
    return this.http.get<any>(this.url).pipe(
      tap((res) => {
        console.log("EmployeeModel", res);
        this.emodels = res;
      })
    );
  }

  getOne(id: string): Observable<EmployeeModel> {
    let urlID = this.url + id + "/";
    return this.http.get<EmployeeModel>(urlID).pipe(
      tap((res: EmployeeModel) => {
        console.log("EmployeeModel", res);
        this.emodel = res;
      })
    );
  }

  update(body: Form): Observable<EmployeeModel> {
    return this.http.patch<EmployeeModel>(this.url, body).pipe(
      tap((res) => {
        console.log("EmployeeModel", res);
      })
    );
  }

  delete(id: string): Observable<any> {
    return this.http.delete(this.url + id + "/").pipe(
      tap((res) => {
        console.log("EmployeeModel", res);
      })
    );
  }

  filter(field: string): Observable<EmployeeModel[]> {
    let urlFilter = this.url + "?" + field;
    return this.http.get<EmployeeModel[]>(urlFilter).pipe(
      tap((res) => {
        console.log("EmployeeModel", res);
      })
    );
  }
}
