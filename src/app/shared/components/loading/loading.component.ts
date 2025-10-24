import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoadingService } from '../../../core/services/loading/loading.service';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';

@Component({
  selector: 'app-loading',
  standalone: true,
  imports: [CommonModule, MatProgressSpinnerModule],
  template: `
    @if (loadingService.isLoading()){
      <div
        class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
        role="status"
        aria-label="Loading"
      >
        <div class="bg-white rounded-lg p-6 shadow-xl flex flex-col items-center space-y-4">
          <!-- Spinner -->
          <mat-progress-spinner> </mat-progress-spinner>

          <!-- Loading text -->
          <p class="text-gray-700 font-medium">Loading...</p>

          <!-- Optional: Loading dots animation -->
          <div class="flex space-x-1">
            <div class="w-2 h-2 bg-blue-600 rounded-full animate-bounce"></div>
            <div class="w-2 h-2 bg-blue-600 rounded-full animate-bounce" style="animation-delay: 0.1s"></div>
            <div class="w-2 h-2 bg-blue-600 rounded-full animate-bounce" style="animation-delay: 0.2s"></div>
          </div>
        </div>
      </div>

    }
  `,
  styles: [`
    .animate-bounce {
      animation: bounce 1s infinite;
    }
    @keyframes bounce {
      0%, 20%, 53%, 80%, 100% {
        transform: translate3d(0,0,0);
      }
      40%, 43% {
        transform: translate3d(0, -8px, 0);
      }
      70% {
        transform: translate3d(0, -4px, 0);
      }
      90% {
        transform: translate3d(0, -2px, 0);
      }
    }
  `]
})
export class LoadingComponent {
  loadingService = inject(LoadingService);
}
