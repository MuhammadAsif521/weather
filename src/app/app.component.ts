import { SplashScreen } from '@capacitor/splash-screen';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { IonApp, IonRouterOutlet } from '@ionic/angular/standalone';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  standalone: true,
  imports: [IonApp, IonRouterOutlet,RouterModule],
})
export class AppComponent {
  constructor() {
    this.initializeApp();
  }
  initializeApp() {
    setTimeout(() => {
      SplashScreen.hide();
    }, 3000); 
  }
}
