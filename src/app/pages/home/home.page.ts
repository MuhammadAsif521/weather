import { Component, CUSTOM_ELEMENTS_SCHEMA, inject, OnInit, signal, WritableSignal } from '@angular/core';
import { IonContent, IonIcon, IonList, IonLabel, IonItem, IonInput, IonRefresher, IonRefresherContent } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { arrowDown, chevronDownCircleOutline, locationOutline, refresh, search, water } from 'ionicons/icons';
import { WeatherResponse } from 'src/app/core/Interfaces/core.interface';
import { WeatherapiService } from 'src/app/core/services/weatherapi.service';
import { CustomDatePipe } from 'src/app/core/pipes/customdate.pipe';
import { FormsModule } from '@angular/forms';
import { ToastService } from 'src/app/core/services/toast.service';
import { RefreshService } from 'src/app/core/services/refresh.service';
import { NgIf } from '@angular/common';

addIcons({
  location: locationOutline,
  water,
  refresh,
  search,
  chevronDownCircleOutline
});

@Component({
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
  standalone: true,
  imports: [
    IonLabel,
    NgIf,
    IonIcon,
    IonContent,
    IonList,
    IonItem,
    IonInput,
    IonRefresher,
    IonRefresherContent,
    CustomDatePipe,
    FormsModule
  ]
})
export class HomePage implements OnInit {
  public customDate: CustomDatePipe = inject(CustomDatePipe);
  private apiService: WeatherapiService = inject(WeatherapiService);
  private toastService: ToastService = inject(ToastService);
  private refreshService: RefreshService = inject(RefreshService);

  public weatherData: WritableSignal<WeatherResponse | undefined> = signal<WeatherResponse | undefined>(undefined);
  public todayDate = signal<string>(new Date().toISOString());
  public cityName: string = 'Pakpattan';
  public weatherIcon = signal<string>('');

  public ngOnInit(): void {
    if (this.cityName) {
      this.fetchWeatherData(this.cityName);
    }
  }

  public fetchWeatherData(cityName: string): void {
    if (!cityName.trim()) {
      this.toastService.showToast('Please enter a city name');
      return;
    }

    this.apiService.fetchWeatherData(cityName.trim()).subscribe(results => {
      if (results) {
        this.weatherData.set(results);
        this.weatherIcon.set(`https://openweathermap.org/img/wn/${results.weather[0].icon}@4x.png`);
      }
    });
  }

  public async doRefresh(event: CustomEvent<any>): Promise<void> {
    if (!this.cityName) {
      this.toastService.showToast('Please enter a city name first');
      event.detail.complete();
      return;
    }

    await this.refreshService.handleRefresh(
      () => this.apiService.fetchWeatherData(this.cityName.trim()),
      () => this.toastService.showToast('Page refreshed successfully!'),
      () => this.toastService.showToast('No internet connection!')
    );

    event.detail.complete();
  }

  public onSearch(event: Event): void {
    event.preventDefault();
    if (this.cityName.trim()) {
      this.fetchWeatherData(this.cityName.trim());
    } else {
      this.toastService.showToast('Please enter a city name');
    }
  }
}