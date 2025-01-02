import { Injectable } from '@angular/core';
import { LoadingController } from '@ionic/angular';

@Injectable({
  providedIn: 'root',
})
export class LoaderService {
  private loader: HTMLIonLoadingElement | null = null;

  constructor(private loadingController: LoadingController) {}

  async showLoader(message: string = 'Loading...', duration?: number): Promise<void> {
    this.loader = await this.loadingController.create({
      message,
      spinner: 'crescent',
      duration:500,
    });
    await this.loader.present();
  }

  async hideLoader(): Promise<void> {
    if (this.loader) {
      await this.loader.dismiss();
    }
  }
}
