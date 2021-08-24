import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { HttpClient } from "@angular/common/http";
import { tap } from "rxjs/operators";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class WamsService {
  url: string = environment.baseUrl + "v1/wams/services/";
  // url: string = "http://127.0.0.1:8000/v1/wams/services/";

  constructor(private http: HttpClient) { }

  getService(body): Observable<any> {
    return this.http.post<any>(this.url, body).pipe(
      tap((res) => {
        console.log(body.service_name, res);
      })
    );
  }

  getEmployee(): Observable<any> {
    let body = {
      service_name: "getEmployee",
    };
    return this.http.post<any>(this.url, body).pipe(
      tap((res) => {
        console.log("getEmployee", res);
      })
    );
  }

  getWorkOrderActivity(): Observable<any> {
    let body = {
      service_name: "getWorkOrderActivity",
      // from_date: "2021-08-20T00:00:00+00:00",
      // to_date: "2021-08-20T23:59:59+00:00"
    };
    return this.http.post<any>(this.url, body).pipe(
      tap((res) => {
        console.log("getWorkOrderActivity", res);
      })
    );
  }

  getAssetSyncOutbound(): Observable<any> {
    let body = {
      service_name: "getAssetSyncOutbound",
    };
    return this.http.post<any>(this.url, body).pipe(
      tap((res) => {
        console.log("getAssetSyncOutbound", res);
      })
    );
  }

  getAssetBadgeNo(badge_no): Observable<any> {
    let body = {
      service_name: "getAsset",
      badge_number: badge_no,
    };
    return this.http.post<any>(this.url, body).pipe(
      tap((res) => {
        console.log("getAsset", res);
      })
    );
  }
}
