import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import {HttpClient} from "@angular/common/http";
import { tap } from "rxjs/operators";
import { Observable } from "rxjs";
import {AssetAttributeColumnModel} from "./asset-attribute-column.model";

@Injectable({
  providedIn: "root",
})

export class AssetAttributeColumnService {
  url: string = environment.baseUrl + "v1/asset-attribute-column";

  //Data
  public gmodels: AssetAttributeColumnModel[] = [];
  public gmodel: AssetAttributeColumnModel;

  constructor(private http: HttpClient) {}

  get(): Observable<AssetAttributeColumnModel[]> {
    return this.http.get<any>(this.url).pipe(
      tap((res) => {
        this.gmodels = res;
      })
    );
  }
}
