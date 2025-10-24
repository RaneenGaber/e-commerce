import {Component, input} from '@angular/core';
import {Router} from '@angular/router';
import {NgClass} from '@angular/common';
import {MatIconModule} from '@angular/material/icon';
import {AuthService} from '../../../core/services/auth/auth';
import {RoutePath} from '../../../core/models/enums/route-path';

@Component({
  selector: 'app-header',
  imports: [NgClass, MatIconModule],
  templateUrl: './header.html',
  styleUrl: './header.css',
})
export class Header {
  pageTitle= input.required<string>();
  breadcrumb = input<string[]>([]);

  constructor(private router: Router,
              private _authService: AuthService) {}

  goToPage(crumb: string ,last: boolean) {

    if (!last){
      this.router.navigate([`/${crumb}`]);
    }
  }

  logout() {
    this._authService.logout();
    this.router.navigate([`/${RoutePath.LOGIN}`])

  }
}
