import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { HttpClient } from "@angular/common/http";
import { Form } from "@angular/forms";
import { tap } from "rxjs/operators";
import { Observable } from "rxjs";
import { ApprovalProfileModel } from "./approval-profile.model";

@Injectable({
  providedIn: "root",
})
export class ApprovalProfileService {
  url: string = environment.baseUrl + "v1/approval-profile/";

  // Data
  public atmodels: ApprovalProfileModel[] = [];
  public atmodel: ApprovalProfileModel;

  constructor(private http: HttpClient) { }

  post(body): Observable<ApprovalProfileModel> {
    return this.http.post<any>(this.url, body).pipe(
      tap((res) => {
        console.log("ApprovalProfileModel", res);
      })
    );
  }

  get(): Observable<ApprovalProfileModel[]> {
    return this.http.get<any>(this.url).pipe(
      tap((res) => {
        console.log("ApprovalProfileModel", res);
        this.atmodels = res;
      })
    );
  }

  getOne(id: string): Observable<ApprovalProfileModel> {
    let urlID = this.url + id + "/";
    return this.http.get<ApprovalProfileModel>(urlID).pipe(
      tap((res: ApprovalProfileModel) => {
        console.log("ApprovalProfileModel", res);
        this.atmodel = res;
      })
    );
  }

  update(body: Form): Observable<ApprovalProfileModel> {
    return this.http.patch<ApprovalProfileModel>(this.url, body).pipe(
      tap((res) => {
        console.log("ApprovalProfileModel", res);
      })
    );
  }

  delete(id: string): Observable<any> {
    return this.http.delete(this.url + id + "/").pipe(
      tap((res) => {
        console.log("ApprovalProfileModel", res);
      })
    );
  }

  filter(field: string): Observable<ApprovalProfileModel[]> {
    let urlFilter = this.url + "?" + field;
    return this.http.get<ApprovalProfileModel[]>(urlFilter).pipe(
      tap((res) => {
        console.log("ApprovalProfileModel", res);
      })
    );
  }
}
