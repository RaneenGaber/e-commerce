import {Routes} from '@angular/router';

export default [
  {
    path: '',
    loadComponent: () =>
      import('./components/login/login').then(
        (c) => c.Login
      ),
  },
] as Routes;
