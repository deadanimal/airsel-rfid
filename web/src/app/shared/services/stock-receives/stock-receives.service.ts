import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import {HttpClient} from "@angular/common/http";
import { tap } from "rxjs/operators";
import { Observable } from "rxjs";
import {StockReceiveModel} from "./stock-receives.model";

@Injectable({
  providedIn: "root",
})
export class StockReceiveService{
  url: string = environment.baseUrl + "v1//stock-receives/";

  //Data
  public gmodels: StockReceiveModel[] = [];
  public gmodel: StockReceiveModel;
  constructor(private http: HttpClient) {}

  get(): Observable<StockReceiveModel[]> {
    return this.http.get<any>(this.url).pipe(
      tap((res) => {
        this.gmodels = res;
      })
    );
  }

  post(body): Observable<StockReceiveModel> {
    return this.http.post<any>(this.url, body).pipe(
      tap((res) => {
      })
    );
  }

}
