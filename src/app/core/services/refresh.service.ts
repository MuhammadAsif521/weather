import { Injectable } from '@angular/core';
import { Observable, from } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RefreshService {
  public async handleRefresh<T>(
    refreshAction: () => Observable<T>,
    onSuccess?: () => void,
    onError?: () => void,
    delay: number = 1000
  ): Promise<void> {
    return new Promise((resolve) => {
      setTimeout(() => {
        if (navigator.onLine) {
          refreshAction().subscribe({
            next: () => {
              onSuccess?.();
              resolve();
            },
            error: () => {
              onError?.();
              resolve();
            }
          });
        } else {
          onError?.();
          resolve();
        }
      }, delay);
    });
  }
}