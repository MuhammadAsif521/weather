import { Routes } from '@angular/router';
import { WeatherPage } from './pages/weather/weather.page';
export const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'home',
    loadComponent: () => import('./pages/home/home.page').then( m => m.HomePage)
  },
  {
    path: 'weather',
    component:WeatherPage,
    data: { reload: true } 
  },
];
