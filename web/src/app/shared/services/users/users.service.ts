import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { HttpClient } from "@angular/common/http";
import { Form } from "@angular/forms";
import { tap } from "rxjs/operators";
import { Observable } from "rxjs";
import { UsersModel } from "./users.model";

@Injectable({
  providedIn: "root",
})
export class UsersService {
  url: string = environment.baseUrl + "v1/users/";

  // Data
  public umodels: UsersModel[] = [];
  public umodel: UsersModel;

  constructor(private http: HttpClient) {}

  post(body: Form): Observable<UsersModel> {
    return this.http.post<any>(this.url, body).pipe(
      tap((res) => {
        console.log("UsersModel", res);
      })
    );
  }

  get(): Observable<UsersModel[]> {
    return this.http.get<any>(this.url).pipe(
      tap((res) => {
        console.log("UsersModel", res);
        this.umodels = res;
      })
    );
  }

  getOne(id: string): Observable<UsersModel> {
    let urlID = this.url + id + "/";
    return this.http.get<UsersModel>(urlID).pipe(
      tap((res: UsersModel) => {
        console.log("UsersModel", res);
        this.umodel = res;
      })
    );
  }

  update(id: string, body: Form): Observable<UsersModel> {
    let urlTemp = this.url + id + '/'
    return this.http.patch<UsersModel>(urlTemp, body).pipe(
      tap((res) => {
        console.log("UsersModel", res);
      })
    );
  }

  delete(id: string): Observable<any> {
    return this.http.delete(this.url + id + "/").pipe(
      tap((res) => {
        console.log("UsersModel", res);
      })
    );
  }

  filter(field: string): Observable<UsersModel[]> {
    let urlFilter = this.url + "?" + field;
    return this.http.get<UsersModel[]>(urlFilter).pipe(
      tap((res) => {
        console.log("UsersModel", res);
      })
    );
  }

  activation(body): Observable<any> {
    return this.http.post<any>(this.url + "activation/", body).pipe(
      tap((res) => {
        console.log("Registration: ", res);
      })
    );
  }
}
