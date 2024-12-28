import { Component, inject, OnInit, signal, WritableSignal } from '@angular/core';
import { IonContent, IonItem, IonIcon, IonLabel, IonChip } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { thermometer } from 'ionicons/icons';
import { WeatherResponse } from 'src/app/core/Interfaces/core.interface';
import { WeatherapiService } from 'src/app/core/services/weatherapi.service';
import { CustomDatePipe } from 'src/app/core/pipes/customdate.pipe';
addIcons({
  thermometer: thermometer,
})
@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss'],
  standalone: true,
  imports: [IonLabel, IonIcon, IonItem, IonContent, CustomDatePipe]
})
export class ModalComponent  implements OnInit {
  public customDate: CustomDatePipe = inject(CustomDatePipe)
  private apiService: WeatherapiService = inject(WeatherapiService);
  public weatherData:WritableSignal<WeatherResponse | undefined> = signal<WeatherResponse | undefined>(undefined);
  public cityName = signal<string | null>(null);
  public todayDate = signal<string>(new Date().toISOString());
  public clouds = signal<WeatherResponse | undefined>(undefined);
  
  public ngOnInit(): void {
    this.fetchWeatherData('Pakpattan');
  }

  public async fetchWeatherData(city: string): Promise<void> {
    this.apiService.fetchWeatherData(city).subscribe(results => {
      this.weatherData.set(results);
      this.cityName.set(results.name);
      console.log(this.weatherData);
    }
    )
  }

  
}
