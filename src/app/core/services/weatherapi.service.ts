import { WeatherResponse } from 'src/app/core/Interfaces/core.interface';
import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WeatherapiService {
  private http: HttpClient = inject(HttpClient);

  fetchWeatherData(city: string): Observable<WeatherResponse> {
    return this.http.get<WeatherResponse>(`${'https://api.openweathermap.org/data/2.5/weather'}?q=${city}&appid=${'9f1e41653940539da83673661f450a6a'}&units=metric`);
  }
  private apiUrl = 'https://api.openweathermap.org/data/2.5/forecast'; 
  private apiKey = '9f1e41653940539da83673661f450a6a';
  
  

  getHourlyForecast(city: string): Observable<any> {
    const apiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&appid=${this.apiKey}`;
    return this.http.get(apiUrl);
  }
  constructor() { }
}
