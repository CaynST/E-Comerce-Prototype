import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink, CommonModule],
  template: `
    <nav class="navbar">
      <div class="container">
        <div class="nav-content">
          <a routerLink="/home" class="logo">ELEGANT</a>
          
          <div class="nav-menu">
            <a routerLink="/home" routerLinkActive="active" class="nav-link">Inicio</a>
            <a routerLink="/shop" routerLinkActive="active" class="nav-link">Tienda</a>
            <a routerLink="/account" routerLinkActive="active" class="nav-link">Mi cuenta</a>
          </div>
          
          <div class="nav-actions">
            <button class="nav-icon" (click)="toggleSearch()">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <circle cx="11" cy="11" r="8"></circle>
                <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
              </svg>
            </button>
            
            <button class="nav-icon" routerLink="/cart">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <circle cx="9" cy="21" r="1"></circle>
                <circle cx="20" cy="21" r="1"></circle>
                <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
              </svg>
              <span *ngIf="cartCount > 0" class="cart-count">{{ cartCount }}</span>
            </button>
            
            <button class="nav-icon" routerLink="/account">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                <circle cx="12" cy="7" r="4"></circle>
              </svg>
            </button>
          </div>
        </div>
      </div>
    </nav>
    
    <div *ngIf="showSearch" class="search-overlay">
      <div class="container">
        <div class="search-container">
          <input 
            type="text" 
            placeholder="Buscar productos..." 
            class="search-input"
            #searchInput
            (keyup.enter)="performSearch(searchInput.value)"
          >
          <button (click)="performSearch(searchInput.value)" class="search-btn">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <circle cx="11" cy="11" r="8"></circle>
              <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
            </svg>
          </button>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .navbar {
      position: sticky;
      top: 0;
      z-index: 1000;
      background-color: rgba(255, 255, 255, 0.95);
      backdrop-filter: blur(10px);
      border-bottom: 1px solid rgba(0, 0, 0, 0.05);
      padding: 16px 0;
      transition: all 0.3s ease;
    }
    
    .nav-content {
      display: flex;
      align-items: center;
      justify-content: space-between;
    }
    
    .logo {
      font-size: 1.5rem;
      font-weight: 700;
      color: #000;
      text-decoration: none;
    }
    
    .nav-menu {
      display: flex;
      gap: 32px;
    }
    
    .nav-link {
      font-weight: 500;
      color: #333;
      position: relative;
      padding: 8px 0;
      transition: color 0.3s ease;
    }
    
    .nav-link:hover,
    .nav-link.active {
      color: #000;
    }
    
    .nav-link.active::after {
      content: '';
      position: absolute;
      bottom: 0;
      left: 0;
      width: 100%;
      height: 2px;
      background-color: #000;
      transform: scaleX(1);
      transition: transform 0.3s ease;
    }
    
    .nav-actions {
      display: flex;
      align-items: center;
      gap: 20px;
    }
    
    .nav-icon {
      position: relative;
      color: #000;
      background: none;
      border: none;
      cursor: pointer;
      padding: 8px;
      border-radius: 4px;
      transition: all 0.3s ease;
    }
    
    .nav-icon:hover {
      background-color: #f5f5f5;
      transform: scale(1.05);
    }
    
    .cart-count {
      position: absolute;
      top: -5px;
      right: -5px;
      background-color: #000;
      color: white;
      font-size: 0.7rem;
      width: 18px;
      height: 18px;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    
    .search-overlay {
      position: fixed;
      top: 70px;
      left: 0;
      right: 0;
      background-color: rgba(255, 255, 255, 0.98);
      padding: 20px 0;
      z-index: 999;
      backdrop-filter: blur(10px);
    }
    
    .search-container {
      display: flex;
      max-width: 600px;
      margin: 0 auto;
      position: relative;
    }
    
    .search-input {
      flex: 1;
      padding: 12px 16px;
      border: 1px solid #ddd;
      border-radius: 4px 0 0 4px;
      font-size: 1rem;
      outline: none;
      transition: border-color 0.3s ease;
    }
    
    .search-input:focus {
      border-color: #000;
    }
    
    .search-btn {
      padding: 12px 16px;
      background-color: #000;
      color: white;
      border: 1px solid #000;
      border-radius: 0 4px 4px 0;
      cursor: pointer;
      transition: all 0.3s ease;
    }
    
    .search-btn:hover {
      background-color: #333;
    }
    
    @media (max-width: 768px) {
      .nav-menu {
        display: none;
      }
      
      .search-overlay {
        top: 60px;
      }
    }
  `]
})
export class NavbarComponent {
  cartCount = 3; // This would come from a service in a real app
  showSearch = false;
  
  toggleSearch() {
    this.showSearch = !this.showSearch;
  }
  
  toggleCart() {
    // Navigate to cart page
    window.location.hash = '#/cart';
  }
  
  performSearch(query: string) {
    console.log('Searching for:', query);
    this.showSearch = false;
  }
}