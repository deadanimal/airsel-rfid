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

  constructor(private http: HttpClient) {}

  getEmployee(): Observable<any> {
    let body = {
      'service_name': 'getEmployee'
    };
    return this.http.post<any>(this.url, body).pipe(
      tap((res) => {
        console.log("getEmployee", res);
      })
    );
  }

  getWorkOrderActivity(): Observable<any> {
    let body = {
      'service_name': 'getWorkOrderActivity'
    };
    return this.http.post<any>(this.url, body).pipe(
      tap((res) => {
        console.log("getWorkOrderActivity", res);
      })
    );
  }

  getAssetSyncOutbound(): Observable<any> {
    let body = {
      'service_name': 'getAssetSyncOutbound'
    };
    return this.http.post<any>(this.url, body).pipe(
      tap((res) => {
        console.log("getAssetSyncOutbound", res);
      })
    );
  }
}
