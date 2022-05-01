import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { weatherData } from '../models/weather.models';

@Injectable({
  providedIn: 'root'
})
export class WeatherServiceService {

  constructor(private http: HttpClient) {
    
  }


  getWeatherData(city:string): Observable<weatherData>{
    return this.http.get<weatherData>(environment.weatherURl,{
      headers: new HttpHeaders()
        .set(environment.XRapidAPIHostName, environment.XRapidAPIHostValue)
        .set(environment.XRapidAPIKeyName, environment.XRapidAPIKeyValue),
        params: new HttpParams()
        .set('q', city)
        .set('units', 'metric')
        .set('mode', 'json')
    })
  }
}
