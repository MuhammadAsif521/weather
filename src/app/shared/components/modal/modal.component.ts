import { Component, CUSTOM_ELEMENTS_SCHEMA, inject, OnInit } from '@angular/core';
import { WeatherapiService } from 'src/app/core/services/weatherapi.service';
import { IonTitle, IonHeader, IonToolbar, IonGrid, IonRow, IonCol, ModalController } from '@ionic/angular/standalone';
import { DatePipe, NgFor } from '@angular/common';
import { DecimalPipe } from '@angular/common';

@Component({
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  standalone: true,
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss'],
  imports: [
    IonTitle,
    IonHeader,
    IonToolbar,
    DatePipe,
    DecimalPipe,
    IonGrid,
    IonRow,
    IonCol,
    NgFor,
  ],
})
export class ModalComponent implements OnInit {
  forecastData: any[] = [];
  cityName: string = ''; // This will be populated from modal props

  private weatherService: WeatherapiService = inject(WeatherapiService);
  private modalController: ModalController = inject(ModalController);

  public ngOnInit(): void {
    if (this.cityName) {
      this.fetchWeatherData(this.cityName);
    }
  }

  fetchWeatherData(cityName: string): void {
    this.weatherService.getHourlyForecast(cityName).subscribe((data: any) => {
      this.forecastData = data.list || [];
    });
  }

  // Close modal
  public closeModal(): void {
    this.modalController.dismiss();
  }
}
