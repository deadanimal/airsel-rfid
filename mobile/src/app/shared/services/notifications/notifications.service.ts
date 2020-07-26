import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { HttpClient } from "@angular/common/http";
import { Form } from "@angular/forms";
import { tap } from "rxjs/operators";
import { Observable } from "rxjs";
import { NotificationsModel } from "./notifications.model";

@Injectable({
  providedIn: "root",
})
export class NotificationsService {
  url: string = environment.baseUrl + "v1/notifications/";

  // Data
  public nmodels: NotificationsModel[] = [];
  public nmodel: NotificationsModel;
  totalnotificationbyuser: number;

  constructor(private http: HttpClient) {}

  post(body: Form): Observable<NotificationsModel> {
    return this.http.post<any>(this.url, body).pipe(
      tap((res) => {
        console.log("NotificationsModel", res);
      })
    );
  }

  get(): Observable<NotificationsModel[]> {
    return this.http.get<any>(this.url).pipe(
      tap((res) => {
        console.log("NotificationsModel", res);
        this.nmodels = res;
      })
    );
  }

  getOne(id: string): Observable<NotificationsModel> {
    let urlID = this.url + id + "/";
    return this.http.get<NotificationsModel>(urlID).pipe(
      tap((res: NotificationsModel) => {
        console.log("NotificationsModel", res);
        this.nmodel = res;
      })
    );
  }

  update(body: Form): Observable<NotificationsModel> {
    return this.http.patch<NotificationsModel>(this.url, body).pipe(
      tap((res) => {
        console.log("NotificationsModel", res);
      })
    );
  }

  delete(id: string): Observable<any> {
    return this.http.delete(this.url + id + "/").pipe(
      tap((res) => {
        console.log("NotificationsModel", res);
      })
    );
  }

  filter(field: string): Observable<NotificationsModel[]> {
    let urlFilter = this.url + "?" + field;
    return this.http.get<NotificationsModel[]>(urlFilter).pipe(
      tap((res) => {
        console.log("NotificationsModel", res);
        this.totalnotificationbyuser = res.length;
      })
    );
  }
}
