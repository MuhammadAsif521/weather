import { bootstrapApplication } from '@angular/platform-browser';
import { RouteReuseStrategy, provideRouter, withPreloading, PreloadAllModules, } from '@angular/router';
import { IonicRouteStrategy, provideIonicAngular,  } from '@ionic/angular/standalone';
import { routes } from './app/app.routes';
import { AppComponent } from './app/app.component';import { provideHttpClient } from '@angular/common/http';
import { CustomDatePipe } from './app/core/pipes/customdate.pipe';

bootstrapApplication(AppComponent, {
  providers: [
    CustomDatePipe,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    provideIonicAngular(),
    provideHttpClient(),
    provideRouter(routes, withPreloading(PreloadAllModules)),
],
});