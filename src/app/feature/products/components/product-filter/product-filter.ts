import {Component, input, output, signal} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatSelectModule} from '@angular/material/select';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {ProductFilterService} from '../../services/product-filter.service';

@Component({
  selector: 'app-product-filter',
  imports: [
    FormsModule,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule
  ],
  templateUrl: './product-filter.html'
})
export class ProductFilter {
  brands = input<string[]>([]);
  onFilter = output<{ selectedBrand: string, searchTerm: string }>();

  selectedBrand = signal<string>('');
  searchTerm = signal<string>('');

  constructor(private productFilterService: ProductFilterService) {}

  onBrandChange(brand: string) {
    this.selectedBrand.set(brand);
  }

  onSearchChange(searchTerm: string) {
    this.searchTerm.set(searchTerm);
    this.productFilterService.updateSearchTerm(searchTerm);
  }

  reset() {
    this.selectedBrand.set('');
    this.searchTerm.set('');
    this.productFilterService.resetFilters();

  }

  filter() {
    if (this.selectedBrand() || this.searchTerm()) {
      this.onFilter.emit({
        selectedBrand: this.selectedBrand(),
        searchTerm: this.searchTerm()
      })
    }
  }
}
