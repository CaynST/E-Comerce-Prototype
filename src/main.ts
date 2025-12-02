import { bootstrapApplication } from '@angular/platform-browser';
import { provideRouter } from '@angular/router';
import { AppComponent } from './app/app.component';
import { provideAnimations } from '@angular/platform-browser/animations';

const routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', loadComponent: () => import('./app/pages/home/home.component') },
  { path: 'shop', loadComponent: () => import('./app/pages/shop/shop.component') },
  { path: 'product/:id', loadComponent: () => import('./app/pages/product/product.component') },
  { path: 'cart', loadComponent: () => import('./app/pages/cart/cart.component') },
  { path: 'checkout', loadComponent: () => import('./app/pages/checkout/checkout.component') },
  { path: 'account', loadComponent: () => import('./app/pages/account/account.component') },
  { path: '**', redirectTo: '/home', pathMatch: 'full' }
];

bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(routes),
    provideAnimations()
  ]
});