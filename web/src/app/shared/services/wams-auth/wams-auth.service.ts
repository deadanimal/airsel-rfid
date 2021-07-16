import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { HttpClient } from "@angular/common/http";
import { Form } from "@angular/forms";
import { tap } from "rxjs/operators";
import { Observable } from "rxjs";

import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class WamsAuthService {

  url: string = "https://api4.airselangor.com/apimgr/api/2/Authenticate";

  constructor(private http: HttpClient) {}

  authenticate(body): Observable<EmployeeModel> {
    return this.http.post<any>(this.url, body).pipe(
      tap((res) => {
        console.log("EmployeeModel", res);
      })
    );
  }


}
