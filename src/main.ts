import { bootstrapApplication } from '@angular/platform-browser';
import { RouteReuseStrategy, provideRouter, withPreloading, PreloadAllModules, withHashLocation, } from '@angular/router';
import { IonicRouteStrategy, provideIonicAngular,  } from '@ionic/angular/standalone';
import { routes } from './app/app.routes';
import { AppComponent } from './app/app.component';import { provideHttpClient } from '@angular/common/http';
import { CustomDatePipe } from './app/core/pipes/customdate.pipe';
import { FormsModule } from '@angular/forms';
import { importProvidersFrom } from '@angular/core';
import {ModalController}  from '@ionic/angular'
import { register } from 'swiper/element/bundle';
register();

bootstrapApplication(AppComponent, {
  providers: [
    CustomDatePipe,
    importProvidersFrom( FormsModule,ModalController),
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    provideIonicAngular(),
    provideHttpClient(),
    provideRouter(routes,withHashLocation(),withPreloading(PreloadAllModules)),
],
});