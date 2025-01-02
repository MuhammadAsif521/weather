import { SplashScreen } from '@capacitor/splash-screen';
import { HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { IonApp, IonRouterOutlet } from '@ionic/angular/standalone';
import { Keyboard } from '@capacitor/keyboard';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  standalone: true,
  imports: [IonApp, IonRouterOutlet,RouterModule,HttpClientModule],
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
