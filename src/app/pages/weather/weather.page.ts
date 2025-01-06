import { Component, CUSTOM_ELEMENTS_SCHEMA, OnInit } from '@angular/core';
import { WeatherapiService } from 'src/app/core/services/weatherapi.service';
import {IonTitle,IonHeader,IonToolbar} from '@ionic/angular/standalone';
import { DatePipe } from '@angular/common';
import { DecimalPipe } from '@angular/common';
@Component({
  schemas:[CUSTOM_ELEMENTS_SCHEMA],
  selector: 'app-weather',
  standalone: true,
  imports: [IonTitle,IonHeader,IonToolbar,DatePipe,DecimalPipe],  
  templateUrl: './weather.page.html',
  styleUrls: ['./weather.page.scss'],
})
export class WeatherPage implements OnInit {
  forecastData: any[] = [];

  cityName: string = 'Pakpattan';

  constructor(private weatherService: WeatherapiService) {}

  ngOnInit() {
    this.fetchWeatherData(this.cityName);
  }


  fetchWeatherData(cityName: string) {
    this.forecastData = [];

    this.weatherService.getHourlyForecast(cityName).subscribe(
      (data: any) => {
        this.forecastData = data.list || [];
      },
    );
  }
  
}