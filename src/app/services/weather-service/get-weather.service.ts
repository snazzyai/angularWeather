import { Injectable } from '@angular/core';
import { HttpClient } from  '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Observable } from "rxjs";


@Injectable({
  providedIn: 'root'
})
export class GetWeatherService {

  private apiUrl: string = environment.apiUrl
  private apiKey: string = environment.apiKey


  constructor(private http: HttpClient) { }

  getWeatherData(location: string): Observable<any> {
    return this.http.get<any>(this.apiUrl + `weather?q=${location}&APPID=${this.apiKey}`)
  }
}
