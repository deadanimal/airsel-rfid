import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { HttpClient } from "@angular/common/http";
import { Form } from "@angular/forms";
import { tap } from "rxjs/operators";
import { Observable } from "rxjs";
import { ContactInformationModel } from "./contact-information.model";

@Injectable({
  providedIn: "root",
})
export class ContactInformationService {
  url: string = environment.baseUrl + "v1/contact-information/";

  // Data
  public amodels: ContactInformationModel[] = [];
  public amodel: ContactInformationModel;

  constructor(private http: HttpClient) { }

  post(body): Observable<ContactInformationModel> {
    return this.http.post<any>(this.url, body).pipe(
      tap((res) => {
        console.log("ContactInformationModel", res);
      })
    );
  }

  get(): Observable<ContactInformationModel[]> {
    return this.http.get<any>(this.url).pipe(
      tap((res) => {
        console.log("ContactInformationModel", res);
        this.amodels = res;
      })
    );
  }

  getOne(id: string): Observable<ContactInformationModel> {
    let urlID = this.url + id + "/";
    return this.http.get<ContactInformationModel>(urlID).pipe(
      tap((res: ContactInformationModel) => {
        console.log("ContactInformationModel", res);
        this.amodel = res;
      })
    );
  }

  update(id: string, body: Form): Observable<ContactInformationModel> {
    let urlTemp = this.url + id + '/'
    return this.http.patch<ContactInformationModel>(urlTemp, body).pipe(
      tap((res) => {
        console.log("ContactInformationModel", res);
      })
    );
  }

  delete(id: string): Observable<any> {
    return this.http.delete(this.url + id + "/").pipe(
      tap((res) => {
        console.log("ContactInformationModel", res);
      })
    );
  }

  filter(field: string): Observable<ContactInformationModel[]> {
    let urlFilter = this.url + "?" + field + "/";
    return this.http.get<ContactInformationModel[]>(urlFilter).pipe(
      tap((res) => {
        console.log("ContactInformationModel", res);
      })
    );
  }
}
