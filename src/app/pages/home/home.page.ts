import { Component, OnInit } from '@angular/core';
import { IonContent } from '@ionic/angular/standalone';
import { LayoutComponent } from 'src/app/layout/layout.component';
import { WeatherComponent } from 'src/app/shared/components/weather/weather.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
  standalone: true,
  imports: [IonContent,LayoutComponent]
})
export class HomePage implements OnInit {
ngOnInit(): void {
}
}