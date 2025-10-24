import { Injectable, signal } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoadingService {
  private loadingSubject = new BehaviorSubject<boolean>(false);
  private loadingCount = 0;

  // Signal-based loading state (modern approach)
  public isLoading = signal(false);


  /**
   * Start loading - increments the loading counter
   */
  startLoading(): void {
    this.loadingCount++;
    this.updateLoadingState();
  }

  /**
   * Stop loading - decrements the loading counter
   */
  stopLoading(): void {
    if (this.loadingCount > 0) {
      this.loadingCount--;
    }
    this.updateLoadingState();
  }

  /**
   * Update loading state based on current count
   */
  private updateLoadingState(): void {
    const isLoading = this.loadingCount > 0;

    this.isLoading.set(isLoading);

    this.loadingSubject.next(isLoading);
  }

}
