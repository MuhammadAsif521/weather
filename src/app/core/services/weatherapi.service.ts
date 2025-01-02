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

  fetchCitySuggestions(query: string): Observable<string[]> {
    const url = `https://api.openweathermap.org/geo/1.0/direct?q=${query}&limit=5&appid=9f1e41653940539da83673661f450a6a`;
    return this.http.get<any[]>(url).pipe(
      map((response) => response.map((city) => city.name))
    );
  }
  
  constructor() { }
}
