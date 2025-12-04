import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [RouterLink, CommonModule],
  template: `
    <div class="container">
      <div class="cart-header">
        <h1 class="section-title">Tu carrito</h1>
        <p class="section-subtitle">Revisa y administra los artículos</p>
      </div>
      
      <div *ngIf="cartItems.length > 0; else emptyCart">
        <div class="cart-content">
          <div class="cart-items">
            <div *ngFor="let item of cartItems" class="cart-item card">
                <div class="item-image">
                  <img [src]="item.image" [alt]="item.name">
                </div>
                
                <div class="item-details">
                  <h3 class="item-name">{{ item.name }}</h3>
                  <p class="item-variant">{{ item.size }} | {{ item.color }}</p>
                  <div class="item-price">\${{ item.price }}</div>
                </div>
                
                <div class="item-quantity">
                  <div class="quantity-controls">
                    <button (click)="decreaseQuantity(item)" class="quantity-btn">-</button>
                    <span class="quantity-value">{{ item.quantity }}</span>
                    <button (click)="increaseQuantity(item)" class="quantity-btn">+</button>
                  </div>
                </div>
                
                <div class="item-total">
                  \${{ (item.price * item.quantity).toFixed(2) }}
                </div>
                
                <button 
                  class="remove-item"
                  (click)="removeItem(item.id)"
                  aria-label="Remove item"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <line x1="18" y1="6" x2="6" y2="18"></line>
                    <line x1="6" y1="6" x2="18" y2="18"></line>
                  </svg>
                </button>
              </div>
            </div>
          
          <div class="cart-summary">
            <h2 class="summary-title">Resumen del pedido</h2>
            
            <div class="summary-row">
                <span>Subtotal</span>
                <span>\${{ subtotal.toFixed(2) }}</span>
              </div>
            
            <div class="summary-row">
              <span>Envío</span>
              <span>{{ shippingCost === 0 ? 'GRATIS' : '$' + shippingCost.toFixed(2) }}</span>
            </div>
            
            <div class="summary-row">
              <span>Impuestos</span>
              <span>\${{ tax.toFixed(2) }}</span>
            </div>
            
            <div class="summary-divider"></div>
            
            <div class="summary-row total">
              <span>Total</span>
              <span class="total-amount">\${{ total.toFixed(2) }}</span>
            </div>
            
            <button class="btn btn-primary checkout-btn" routerLink="/checkout">
              Ir al pago
            </button>
            
            <button class="btn btn-outline continue-btn" routerLink="/shop">
              Seguir comprando
            </button>
          </div>
        </div>
      </div>
      <ng-template #emptyCart>
        <div class="empty-cart">
          <div class="empty-cart-icon">
            <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <circle cx="9" cy="21" r="1"></circle>
              <circle cx="20" cy="21" r="1"></circle>
              <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
            </svg>
          </div>
          <h2>Tu carrito está vacío</h2>
          <p>Parece que no has agregado nada todavía</p>
          <a routerLink="/shop" class="btn btn-primary">Comenzar a comprar</a>
        </div>
      </ng-template>
    </div>
  `,
  styles: [`
    .cart-header {
      text-align: center;
      margin-bottom: 40px;
    }
    
    .cart-content {
      display: grid;
      grid-template-columns: 2fr 1fr;
      gap: 40px;
    }
    
    .cart-items {
      display: flex;
      flex-direction: column;
      gap: 20px;
    }
    
    .cart-item {
      display: grid;
      grid-template-columns: 100px 1fr auto auto auto;
      align-items: center;
      gap: 20px;
      padding: 20px;
    }
    
    .item-image {
      width: 80px;
      height: 80px;
    }
    
    .item-image img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      border-radius: 4px;
    }
    
    .item-details {
      display: flex;
      flex-direction: column;
      gap: 4px;
    }
    
    .item-name {
      font-weight: 500;
      font-size: 1.1rem;
    }
    
    .item-variant {
      color: #666;
      font-size: 0.9rem;
    }
    
    .item-price {
      font-weight: 500;
    }
    
    .item-quantity {
      display: flex;
      align-items: center;
      gap: 12px;
    }
    
    .quantity-controls {
      display: flex;
      align-items: center;
      gap: 8px;
    }
    
    .quantity-btn {
      width: 30px;
      height: 30px;
      border: 1px solid #ddd;
      background: white;
      border-radius: 4px;
      font-size: 1rem;
      cursor: pointer;
      transition: all 0.3s ease;
    }
    
    .quantity-btn:hover {
      border-color: #000;
    }
    
    .quantity-value {
      min-width: 30px;
      text-align: center;
      font-weight: 500;
    }
    
    .item-total {
      font-weight: 600;
      min-width: 80px;
      text-align: right;
    }
    
    .remove-item {
      background: none;
      border: none;
      color: #999;
      cursor: pointer;
      padding: 8px;
      border-radius: 4px;
      transition: all 0.3s ease;
    }
    
    .remove-item:hover {
      color: #d32f2f;
      background-color: #ffebee;
    }
    
    .cart-summary {
      background: #f9f9f9;
      padding: 24px;
      border-radius: 8px;
      height: fit-content;
    }
    
    .summary-title {
      font-size: 1.3rem;
      margin-bottom: 20px;
      padding-bottom: 12px;
      border-bottom: 1px solid #eee;
    }
    
    .summary-row {
      display: flex;
      justify-content: space-between;
      margin-bottom: 12px;
    }
    
    .summary-row.total {
      font-weight: 600;
      font-size: 1.1rem;
      margin-top: 8px;
    }
    
    .total-amount {
      color: #000;
    }
    
    .summary-divider {
      height: 1px;
      background: #eee;
      margin: 12px 0;
    }
    
    .checkout-btn {
      width: 100%;
      margin: 20px 0;
      padding: 16px;
      font-size: 1.1rem;
    }
    
    .continue-btn {
      width: 100%;
      padding: 12px;
    }
    
    .empty-cart {
      text-align: center;
      padding: 80px 20px;
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 20px;
    }
    
    .empty-cart-icon {
      color: #ccc;
    }
    
    .empty-cart h2 {
      font-size: 1.8rem;
      margin-bottom: 8px;
    }
    
    .empty-cart p {
      color: #666;
      margin-bottom: 20px;
    }
    
    @media (max-width: 768px) {
      .cart-content {
        grid-template-columns: 1fr;
        gap: 30px;
      }
      
      .cart-item {
        grid-template-columns: 1fr;
        gap: 16px;
      }
      
      .item-image {
        align-self: flex-start;
      }
      
      .item-quantity {
        justify-self: flex-start;
      }
      
      .item-total {
        text-align: left;
      }
    }
  `]
})
export class CartComponent implements OnInit {
  cartItems = [
    {
      id: 1,
      name: 'Camisa Blanca Clásica',
      image: 'https://placehold.co/300x300/f5f5f5/333333?text=Product+1',
      price: 89.99,
      quantity: 1,
      size: 'M',
      color: 'Blanco'
    },
    {
      id: 2,
      name: 'Jeans Ajustados',
      image: 'https://placehold.co/300x300/f5f5f5/333333?text=Product+2',
      price: 79.99,
      quantity: 2,
      size: 'L',
      color: 'Azul'
    },
    {
      id: 3,
      name: 'Suéter de Cachemira',
      image: 'https://placehold.co/300x300/f5f5f5/333333?text=Product+3',
      price: 149.99,
      quantity: 1,
      size: 'M',
      color: 'Gris'
    }
  ];

  subtotal = 0;
  shippingCost = 0;
  tax = 0;
  total = 0;

  ngOnInit(): void {
    this.calculateTotals();
  }

  calculateTotals() {
    this.subtotal = this.cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    this.tax = this.subtotal * 0.08; // 8% tax
    this.total = this.subtotal + this.shippingCost + this.tax;
  }

  increaseQuantity(item: any) {
    item.quantity++;
    this.calculateTotals();
  }

  decreaseQuantity(item: any) {
    if (item.quantity > 1) {
      item.quantity--;
      this.calculateTotals();
    }
  }

  removeItem(itemId: number) {
    this.cartItems = this.cartItems.filter(item => item.id !== itemId);
    this.calculateTotals();
  }
}