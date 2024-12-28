import { addIcons } from 'ionicons';
import { 
  searchCircleOutline,
  locationOutline, 
  notificationsOutline, 
  partlySunny, 
  sunnyOutline, 
  cloudyNightOutline, 
  rainyOutline, 
  water, 
  chevronUpOutline,
} from 'ionicons/icons';
import { WeatherapiService } from './../../../core/services/weatherapi.service';
import { Component, CUSTOM_ELEMENTS_SCHEMA, inject, OnInit, signal } from '@angular/core';
import { WeatherResponse } from 'src/app/core/Interfaces/core.interface';
import { DatePipe } from '@angular/common';

addIcons({
  search :searchCircleOutline,
  location: locationOutline,
  notifications: notificationsOutline,
  'partly-sunny': partlySunny,
  sunny: sunnyOutline,
  rainy: rainyOutline,
  'cloudy-night': cloudyNightOutline,
  water: water,
  'chevron-up': chevronUpOutline,
});


@Component({
  standalone: true,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.scss'],
  imports: [DatePipe],
})
export class WeatherComponent implements OnInit {
  private apiService: WeatherapiService = inject(WeatherapiService);
  public weatherData = signal<WeatherResponse | undefined>(undefined);
  public cityName = signal<string | null>(null);
  public todayDate: string = '';
  public weatherIcon: string = 'partly-Sunny';
  public weatherDescription: string = '';
  public weatherIconColor: string = 'warning';

  public async fetchedData(city: string): Promise<void> {
    this.apiService.fetchWeatherData(city).subscribe((results) => {
      this.weatherData.set(results);
      this.cityName.set(results.name);
      const temp = results.main.temp; 
      this.setWeatherIcon(temp);
      console.log(this.weatherData);
    });
  }

  public setWeatherIcon(temp: number): void {
    if (temp >= 30) {
      this.weatherIconColor = 'danger';
      this.weatherIcon = 'sunny';
    } else if (temp >= 20) {
      this.weatherIconColor = 'warning';
      this.weatherIcon = 'partly-Sunny';
    } else if (temp >= 10) {
      this.weatherIconColor = 'light';
      this.weatherIcon = 'cloudy-Night';
    } else {
      this.weatherIconColor = 'primary';
      this.weatherIcon = 'rainy';
    }
  }

  public ngOnInit(): void {
    this.fetchedData('Pakpattan');
    setInterval(() => {
      this.todayDate = new Date().toLocaleString(); // Updates the time
    }, 1000); 
  }
}
