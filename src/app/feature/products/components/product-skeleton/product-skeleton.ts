import { Component } from '@angular/core';

@Component({
  selector: 'app-product-skeleton',
  template: `
    <div class="animate-pulse">
      <div class="bg-white rounded-lg shadow-md p-4">
        <!-- Image skeleton -->
        <div class="bg-gray-300 h-48 w-full rounded mb-4"></div>
        
        <!-- Content skeleton -->
        <div class="space-y-2">
          <!-- Brand name skeleton -->
          <div class="bg-gray-300 h-4 w-20 rounded"></div>
          
          <!-- Product name skeleton -->
          <div class="bg-gray-300 h-5 w-3/4 rounded"></div>
          
          <!-- Description skeleton -->
          <div class="space-y-1">
            <div class="bg-gray-300 h-3 w-full rounded"></div>
            <div class="bg-gray-300 h-3 w-2/3 rounded"></div>
          </div>
          
          <!-- Price and quantity skeleton -->
          <div class="flex justify-between items-center pt-2">
            <div class="bg-gray-300 h-6 w-16 rounded"></div>
            <div class="bg-gray-300 h-4 w-12 rounded"></div>
          </div>
        </div>
      </div>
    </div>
  `,
  standalone: true
})
export class ProductSkeleton {}
