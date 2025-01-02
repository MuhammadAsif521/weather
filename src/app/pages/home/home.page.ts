import { Component, CUSTOM_ELEMENTS_SCHEMA, inject, OnInit, signal, WritableSignal } from '@angular/core';
import { IonContent, IonIcon, IonLabel, IonItem, IonInput, IonRefresher, IonRefresherContent } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { chevronDownCircleOutline, locationOutline, refresh, search, water } from 'ionicons/icons';
import { WeatherResponse } from 'src/app/core/Interfaces/core.interface';
import { WeatherapiService } from 'src/app/core/services/weatherapi.service';
import { CustomDatePipe } from 'src/app/core/pipes/customdate.pipe';
import { FormsModule } from '@angular/forms';
import { ToastService } from 'src/app/core/services/toast.service';
import { RefreshService } from 'src/app/core/services/refresh.service';
import { LoadingController } from '@ionic/angular/standalone';
import { LoaderService } from 'src/app/core/services/loader.service';
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
    IonIcon,
    IonContent,
    IonItem,
    IonInput,
    IonRefresher,
    IonRefresherContent,
    CustomDatePipe,
    FormsModule,
  ]
})
export class HomePage implements OnInit {
  public customDate: CustomDatePipe = inject(CustomDatePipe);
  private apiService: WeatherapiService = inject(WeatherapiService);
  private toastService: ToastService = inject(ToastService);
  private refreshService: RefreshService = inject(RefreshService);
  private loaderService: LoaderService = inject(LoaderService); // Inject LoaderService

  public weatherData: WritableSignal<WeatherResponse | undefined> = signal<WeatherResponse | undefined>(undefined);
  public todayDate = signal<string>(new Date().toISOString());
  public cityName: string = 'Pakpattan';
  public weatherIcon = signal<string>('');

  public ngOnInit(): void {
    if (this.cityName) {
      this.fetchWeatherData(this.cityName);
    }
  }

  public async fetchWeatherData(cityName: string): Promise<void> {
    if (!cityName.trim()) {
      this.weatherData.set(undefined);
      this.weatherIcon.set('');
      return;
    }

    await this.loaderService.showLoader('Fetching weather data...');

    this.apiService.fetchWeatherData(cityName.trim()).subscribe(
      results => {
        if (results) {
          this.weatherData.set(results);
          this.weatherIcon.set(`https://openweathermap.org/img/wn/${results.weather[0].icon}@4x.png`);
        } else {
          this.weatherData.set(undefined);
          this.toastService.showToast('No data found for this city');
        }
      },
      error => {
        if (error.status === 404) {
          this.toastService.showToast('Invalid city name. Please try again.');
        }
        this.weatherData.set(undefined);
        this.weatherIcon.set('');
      },
      () => {
        this.loaderService.hideLoader(); // Ensure loader is dismissed
      }
    );
  }

  public async doRefresh(event: CustomEvent<any>): Promise<void> {
    if (!this.cityName) {
      this.toastService.showToast('Please enter a city name first');
      event.detail.complete();
      return;
    }

    await this.loaderService.showLoader('Refreshing...');
    await this.refreshService.handleRefresh(
      () => this.apiService.fetchWeatherData(this.cityName.trim()),
      () => this.toastService.showToast('Page refreshed successfully!'),
      () => this.toastService.showToast('No internet connection!')
    );

    this.loaderService.hideLoader(); // Ensure loader is dismissed
    event.detail.complete();
  }

  public async onSearch(event: Event): Promise<void> {
    event.preventDefault();
    if (this.cityName.trim()) {
      await this.loaderService.showLoader('Searching weather data...');
      this.fetchWeatherData(this.cityName.trim());
      this.loaderService.hideLoader(); // Ensure loader is dismissed
    } else {
      this.weatherData.set(undefined);
      this.weatherIcon.set('');
      this.toastService.showToast('Please enter a city name');
    }
  }

  public onInput(event: any): void {
    if (!this.cityName.trim()) {
      this.weatherData.set(undefined);
      this.weatherIcon.set('');
    }
  }
  
}