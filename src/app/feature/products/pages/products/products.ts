import {Component, signal} from '@angular/core';
import {Product} from '../../models/interfaces/product';
import {ProductFilter} from '../../components/product-filter/product-filter';
import {ProductList} from '../../components/product-list/product-list';

@Component({
  selector: 'app-products',
  imports: [ProductFilter,ProductList],
  templateUrl: './products.html',
  styleUrl: './products.css',
})
export class Products {
  filteredProducts = signal<Product[]>([]);
  products = signal<Product[]>([
    {
      id: "42dd7f88-d118-4dd5-9393-24f458eca1aa",
      productName: "Product 1",
      description: "Description for product 1",
      quantity: 79,
      imageUrl: "https://picsum.photos/seed/p1/400/300",
      price: 41.08,
      brandName: "Acme"
    },
    {
      id: "e5d42c48-34a4-40c0-a8ca-467a6bcd0a7f",
      productName: "Product 2",
      description: "Description for product 2",
      quantity: 54,
      imageUrl: "https://picsum.photos/seed/p2/400/300",
      price: 63.39,
      brandName: "Globex"
    },
    {
      id: "373c9e4b-e246-4057-adea-c8e918de7653",
      productName: "Product 3",
      description: "Description for product 3",
      quantity: 13,
      imageUrl: "https://picsum.photos/seed/p3/400/300",
      price: 103.58,
      brandName: "Soylent"
    },
    {
      id: "734b78ca-b956-4150-a2fe-e2a3d3865397",
      productName: "Product 4",
      description: "Description for product 4",
      quantity: 97,
      imageUrl: "https://picsum.photos/seed/p4/400/300",
      price: 68.81,
      brandName: "Initech"
    },
    {
      id: "a61e7971-db4c-4c59-98c7-87699af25c3e",
      productName: "Product 5",
      description: "Description for product 5",
      quantity: 55,
      "imageUrl": "https://picsum.photos/seed/p5/400/300",
      price: 62.61,
      brandName: "Acme"
    },
    {
      id: "c02bc2e5-b950-4f40-a470-acd3b9bc5d76",
      productName: "Product 6",
      description: "Description for product 6",
      quantity: 12,
      imageUrl: "https://picsum.photos/seed/p6/400/300",
      price: 92.05,
      brandName: "Globex"
    },
    {
      id: "d625f3f0-9845-4fd9-92f2-0666a2011a8b",
      productName: "Product 7",
      description: "Description for product 7",
      quantity: 78,
      imageUrl: "https://picsum.photos/seed/p7/400/300",
      price: 17.18,
      brandName: "Soylent"
    },
    {
      id: "9b9bbac6-5f5f-479c-9a45-e2c31ff57f00",
      productName: "Product 8",
      description: "Description for product 8",
      quantity: 20,
      imageUrl: "https://picsum.photos/seed/p8/400/300",
      price: 96.68,
      brandName: "Initech"
    },
    {
      id: "c510a516-3435-4dec-916b-f21b769d6e20",
      productName: "Product 9",
      description: "Description for product 9",
      quantity: 88,
      imageUrl: "https://picsum.photos/seed/p9/400/300",
      price: 95.38,
      brandName: "Acme"
    },
    {
      id: "5a0bf196-4995-4a44-a5e0-f21b44ced1e9",
      productName: "Product 10",
      description: "Description for product 10",
      quantity: 81,
      imageUrl: "https://picsum.photos/seed/p10/400/300",
      price: 33.12,
      brandName: "Globex"
    }
  ]);

  constructor() {
    this.filteredProducts.set(this.products());
  }

  onFilteredProductsChange(filterCriteria: { selectedBrand: string, searchTerm: string }) {
    let filtered = this.products();

    // Filter by brand
    if (filterCriteria.selectedBrand) {
      filtered = filtered.filter(product =>
        product.brandName === filterCriteria.selectedBrand
      );
    }

    // Filter by product name or description
    if (filterCriteria.searchTerm) {
      const term = filterCriteria.searchTerm.toLowerCase();
      filtered = filtered.filter(product =>
        product.productName.toLowerCase().includes(term) ||
        product.description.toLowerCase().includes(term)
      );
    }

    this.filteredProducts.set(filtered);
  }
}
