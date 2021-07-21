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
url: string = "https://airsel-rfid.prototype.com.my/v1/analytics/analytics_tar/"

  //Data
  public gmodels: TARModel[] = [];
  public gmodel: TARModel;

  constructor(private http: HttpClient) {}

  get(): Observable<TARModel[]> {
    return this.http.get<any>(this.url).pipe(
      tap((res) => {
        this.gmodels = res;
      })
    );
  }
}
