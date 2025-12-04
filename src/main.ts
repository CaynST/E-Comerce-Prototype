import { bootstrapApplication } from '@angular/platform-browser';
import { provideRouter, Routes } from '@angular/router';
import { AppComponent } from './app/app.component';
import { provideAnimations } from '@angular/platform-browser/animations';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', loadComponent: () => import('./app/pages/home/home.component').then(m => m.HomeComponent) },
  { path: 'shop', loadComponent: () => import('./app/pages/shop/shop.component').then(m => m.ShopComponent) },
  { path: 'product/:id', loadComponent: () => import('./app/pages/product/product.component').then(m => m.ProductComponent) },
  { path: 'cart', loadComponent: () => import('./app/pages/cart/cart.component').then(m => m.CartComponent) },
  { path: 'checkout', loadComponent: () => import('./app/pages/checkout/checkout.component').then(m => m.CheckoutComponent) },
  { path: 'account', loadComponent: () => import('./app/pages/account/account.component').then(m => m.AccountComponent) },
  { path: '**', redirectTo: '/home', pathMatch: 'full' }
];

bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(routes),
    provideAnimations()
  ]
});