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
  templateUrl: './product-filter.html',
  styleUrl: './product-filter.css',
})
export class ProductFilter {
  onSearch = output<{ selectedBrand: string, searchTerm: string }>();
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
    this.onSearch.emit({
      selectedBrand: '',
      searchTerm: ''
    })

  }

  search() {
    if (this.selectedBrand() || this.searchTerm()) {
      this.onSearch.emit({
        selectedBrand: this.selectedBrand(),
        searchTerm: this.searchTerm()
      })
    }
  }
}
