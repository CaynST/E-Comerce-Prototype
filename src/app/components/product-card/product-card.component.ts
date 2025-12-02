import { Component, Input, Output, EventEmitter } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-product-card',
  standalone: true,
  imports: [RouterLink, CommonModule],
  template: `
    <div class="product-card card" (mouseenter)="onMouseEnter()" (mouseleave)="onMouseLeave()">
      <div class="product-image-container">
        <img 
          [src]="product.image" 
          [alt]="product.name"
          class="product-image"
          (load)="onImageLoad()"
          (error)="onImageError()"
        >
        <div class="product-badge" *ngIf="product.badge">
          {{ product.badge }}
        </div>
        <button 
          class="add-to-cart-btn" 
          [class.visible]="showAddToCart"
          (click)="addToCart()"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <circle cx="9" cy="21" r="1"></circle>
            <circle cx="20" cy="21" r="1"></circle>
            <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
          </svg>
          Add to Cart
        </button>
      </div>
      <div class="product-info">
        <h3 class="product-name">
          <a [routerLink]="['/product', product.id]">{{ product.name }}</a>
        </h3>
        <p class="product-description">{{ product.description }}</p>
        <div class="product-price">
          <span class="current-price">${{ product.price }}</span>
          @if (product.compareAtPrice) {
            <span class="original-price">${{ product.compareAtPrice }}</span>
          }
        </div>
      </div>
    </div>
  `,
  styles: [`
    .product-card {
      overflow: visible;
      cursor: pointer;
    }
    
    .product-image-container {
      position: relative;
      overflow: hidden;
      border-radius: 8px 8px 0 0;
    }
    
    .product-image {
      width: 100%;
      height: 300px;
      object-fit: cover;
      transition: transform 0.3s ease;
    }
    
    .product-card:hover .product-image {
      transform: scale(1.05);
    }
    
    .product-badge {
      position: absolute;
      top: 12px;
      left: 12px;
      background-color: #000;
      color: white;
      padding: 4px 8px;
      border-radius: 4px;
      font-size: 0.8rem;
      font-weight: 500;
      z-index: 2;
    }
    
    .add-to-cart-btn {
      position: absolute;
      bottom: -40px;
      left: 50%;
      transform: translateX(-50%);
      background-color: #000;
      color: white;
      border: none;
      padding: 8px 16px;
      border-radius: 4px;
      display: flex;
      align-items: center;
      gap: 6px;
      font-size: 0.9rem;
      font-weight: 500;
      opacity: 0;
      transition: all 0.3s ease;
      z-index: 2;
    }
    
    .add-to-cart-btn.visible {
      bottom: 12px;
      opacity: 1;
    }
    
    .product-info {
      padding: 16px;
    }
    
    .product-name {
      font-size: 1.1rem;
      font-weight: 500;
      margin-bottom: 8px;
    }
    
    .product-name a {
      transition: color 0.3s ease;
    }
    
    .product-name a:hover {
      color: #666;
    }
    
    .product-description {
      color: #666;
      font-size: 0.9rem;
      margin-bottom: 12px;
      line-height: 1.4;
      height: 40px;
      overflow: hidden;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
    }
    
    .product-price {
      display: flex;
      align-items: center;
      gap: 8px;
    }
    
    .current-price {
      font-weight: 600;
      font-size: 1.1rem;
    }
    
    .original-price {
      font-weight: 400;
      font-size: 0.9rem;
      color: #999;
      text-decoration: line-through;
    }
  `]
})
export class ProductCardComponent {
  @Input() product: any = {};
  @Output() addToCartEvent = new EventEmitter<any>();
  
  showAddToCart = false;
  
  onMouseEnter() {
    this.showAddToCart = true;
  }
  
  onMouseLeave() {
    this.showAddToCart = false;
  }
  
  addToCart() {
    this.addToCartEvent.emit(this.product);
  }
  
  onImageLoad() {
    // Image loaded successfully
  }
  
  onImageError() {
    // Set a default image if the product image fails to load
    const img = event.target as HTMLImageElement;
    img.src = 'https://placehold.co/300x300/e0e0e0/999999?text=No+Image';
  }
}