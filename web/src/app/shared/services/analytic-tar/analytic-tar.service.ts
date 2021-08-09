import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import {HttpClient} from "@angular/common/http";
import { tap } from "rxjs/operators";
import { Observable } from "rxjs";
import { TARModel } from "./analytic-tar.model";

@Injectable({
  providedIn: "root",
})

export class TarService {
//   url: string = environment.baseUrl + "v1/analytics/analytics_tar";
url: string = environment.baseUrl + "v1/analytics/"

  //Data
  public gmodels: TARModel[] = [];
  public gmodel: TARModel;

  constructor(private http: HttpClient) {}

  get_analytics_tar(): Observable<any> {
    return this.http.get<any>(this.url + "analytics_tar/").pipe(
      tap((res) => {
      })
    );
  }

  get_analytics_wa(): Observable<any> {
    return this.http.get<any>(this.url + "analytics_wa/").pipe(
      tap((res) => {
      })
    );
  }

  get_analytics_acs(): Observable<any> {
    return this.http.get<any>(this.url + "analytics_acs/").pipe(
      tap((res) => {
      })
    );
  }

  get_analytics_tam(): Observable<any> {
    return this.http.get<any>(this.url + "analytics_tam/").pipe(
      tap((res) => {
      })
    );
  }


  post_analytics_tar(): Observable<any> {
    return this.http.post<any>(this.url + "analytics_tar/", {}).pipe(
      tap((res) => {
      })
    );
  }

  post_analytics_wa(): Observable<any> {
    return this.http.post<any>(this.url + "analytics_wa/", {}).pipe(
      tap((res) => {
      })
    );
  }

  post_analytics_acs(): Observable<any> {
    return this.http.post<any>(this.url + "analytics_acs/", {}).pipe(
      tap((res) => {
      })
    );
  }

  post_analytics_tam(): Observable<any> {
    return this.http.post<any>(this.url + "analytics_tam/", {}).pipe(
      tap((res) => {
      })
    );
  }


}
