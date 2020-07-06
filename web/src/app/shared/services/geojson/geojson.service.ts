import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GeojsonService {

  constructor(private http: HttpClient) { }

  getGeoJSON(): Observable<any> {
    return this.http.get<any>('../../../assets/geojson/selangor_geojson.json');
  }
}
