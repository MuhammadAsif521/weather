import { Injectable, inject } from '@angular/core';
import { ToastController } from '@ionic/angular/standalone';

@Injectable({
  providedIn: 'root'
})
export class ToastService {
  private toastController: ToastController = inject(ToastController);

  public async showToast(message: string, duration: number = 2000, position: 'top' | 'middle' | 'bottom' = 'bottom'): Promise<void> {
    const toast = await this.toastController.create({
      message,
      duration,
      position,
      cssClass: 'custom-toast',
    });
    await toast.present();
  }
}