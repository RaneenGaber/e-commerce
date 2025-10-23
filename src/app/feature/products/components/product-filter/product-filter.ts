import {Component, output, signal} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatSelectModule} from '@angular/material/select';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';

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
  onFilter = output<{ selectedBrand: string, searchTerm: string }>();
  uniqueBrands = signal<string[]>([
    'Acme',
    'Globex',
    'Soylent',
    'Initech'

  ]);
  selectedBrand = signal<string>('');
  searchTerm = signal<string>('');

  onBrandChange(brand: string) {
    this.selectedBrand.set(brand);
  }

  onSearchChange(searchTerm: string) {
    this.searchTerm.set(searchTerm);
  }

  reset() {
    this.selectedBrand.set('');
    this.searchTerm.set('');
    this.onFilter.emit({
      selectedBrand: '',
      searchTerm: ''
    })

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
