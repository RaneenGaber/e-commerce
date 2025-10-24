import {Component, input} from '@angular/core';
import {Router} from '@angular/router';
import {NgClass} from '@angular/common';
import {MatIconModule} from '@angular/material/icon';

@Component({
  selector: 'app-header',
  imports: [NgClass,MatIconModule],
  templateUrl: './header.html',
  styleUrl: './header.css',
})
export class Header {
  pageTitle= input.required<string>();
  breadcrumb = input<string[]>([]);

  constructor(private router: Router) {}

  goToPage(crumb: string ,last: boolean) {

    if (!last){
      this.router.navigate([`/${crumb.toLowerCase()}`]);
    }
  }

  navigateToCart() {
    this.router.navigate([`/cart`]);

  }
}
