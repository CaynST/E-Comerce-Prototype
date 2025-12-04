import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [RouterLink, CommonModule, FormsModule],
  template: `
    <div class="container">
      <div class="checkout-header">
        <h1 class="section-title">Pago</h1>
        <p class="section-subtitle">Completa tu compra</p>
      </div>
      
      <div class="checkout-content">
        <div class="checkout-form">
          <div class="form-section">
            <h2>Información de contacto</h2>
            <div class="form-row">
              <div class="form-group">
                <label for="email">Email</label>
                <input type="email" id="email" class="form-control" placeholder="your@email.com">
              </div>
            </div>
          </div>
          
          <div class="form-section">
            <h2>Dirección de envío</h2>
            <div class="form-row">
              <div class="form-group">
                <label for="firstName">Nombre</label>
                <input type="text" id="firstName" class="form-control" placeholder="Juan">
              </div>
              <div class="form-group">
                <label for="lastName">Apellido</label>
                <input type="text" id="lastName" class="form-control" placeholder="Pérez">
              </div>
            </div>

            <div class="form-group">
              <label for="address">Calle y número</label>
              <input type="text" id="address" class="form-control" placeholder="Av. Insurgentes Sur 123">
            </div>

            <div class="form-row">
              <div class="form-group">
                <label for="city">Ciudad</label>
                <input type="text" id="city" class="form-control" placeholder="Ciudad de México">
              </div>
              <div class="form-group">
                <label for="state">Estado / Alcaldía</label>
                <input type="text" id="state" class="form-control" placeholder="CDMX">
              </div>
            </div>

            <div class="form-row">
              <div class="form-group">
                <label for="zip">Código Postal</label>
                <input type="text" id="zip" class="form-control" placeholder="01210">
              </div>
            </div>
          </div>
          
          <div class="form-section">
            <h2>Payment Method</h2>
            <div class="payment-methods">
              <div class="payment-option" [class.selected]="selectedPaymentMethod === 'card'">
                <input 
                  type="radio" 
                  id="card" 
                  name="payment" 
                  value="card" 
                  [(ngModel)]="selectedPaymentMethod"
                >
                <label for="card">Tarjeta de crédito</label>
              </div>
              
              <div class="payment-option" [class.selected]="selectedPaymentMethod === 'paypal'">
                <input 
                  type="radio" 
                  id="paypal" 
                  name="payment" 
                  value="paypal" 
                  [(ngModel)]="selectedPaymentMethod"
                >
                <label for="paypal">PayPal</label>
              </div>
              
              <div class="payment-option" [class.selected]="selectedPaymentMethod === 'apple'">
                <input 
                  type="radio" 
                  id="apple" 
                  name="payment" 
                  value="apple" 
                  [(ngModel)]="selectedPaymentMethod"
                >
                <label for="apple">Apple Pay</label>
              </div>
            </div>
            
            <div *ngIf="selectedPaymentMethod === 'card'" class="payment-details">
              <div class="form-group">
                <label for="cardNumber">Número de tarjeta</label>
                <input type="text" id="cardNumber" class="form-control" placeholder="1234 5678 9012 3456">
              </div>

              <div class="form-row">
                <div class="form-group">
                  <label for="expiry">Fecha de expiración</label>
                  <input type="text" id="expiry" class="form-control" placeholder="MM/AA">
                </div>
                <div class="form-group">
                  <label for="cvv">CVV</label>
                  <input type="text" id="cvv" class="form-control" placeholder="123">
                </div>
              </div>
            </div>
          </div>
          
          <button class="btn btn-primary place-order-btn" (click)="placeOrder()">
            Place Order
          </button>
        </div>
        
        <div class="checkout-summary">
          <h2 class="summary-title">Resumen del pedido</h2>

          <div class="order-items">
            <div *ngFor="let item of cartItems" class="order-item">
              <div class="item-thumb">
                <img [src]="item.image" [alt]="item.name">
              </div>
              <div class="item-info">
                <h4>{{ item.name }}</h4>
                <p>{{ item.quantity }} x \${{ item.price }} • {{ item.size }} • {{ item.color }}</p>
              </div>
              <div class="item-total">
                \${{ (item.price * item.quantity).toFixed(2) }}
              </div>
            </div>
          </div>

          <div class="summary-breakdown">
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
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .checkout-header {
      text-align: center;
      margin-bottom: 40px;
    }
    
    .checkout-content {
      display: grid;
      grid-template-columns: 2fr 1fr;
      gap: 40px;
    }
    
    .form-section {
      margin-bottom: 30px;
    }
    
    .form-section h2 {
      margin-bottom: 20px;
      font-size: 1.3rem;
      font-weight: 600;
    }
    
    .form-row {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 20px;
    }
    
    .form-group {
      margin-bottom: 20px;
    }
    
    .form-group label {
      display: block;
      margin-bottom: 8px;
      font-weight: 500;
      color: #333;
    }
    
    .form-control {
      width: 100%;
      padding: 12px;
      border: 1px solid #ddd;
      border-radius: 4px;
      font-size: 1rem;
      outline: none;
      transition: border-color 0.3s ease;
    }
    
    .form-control:focus {
      border-color: #000;
    }
    
    .payment-methods {
      display: flex;
      gap: 20px;
      margin-bottom: 20px;
      flex-wrap: wrap;
    }
    
    .payment-option {
      flex: 1;
      border: 1px solid #ddd;
      border-radius: 4px;
      padding: 12px;
      cursor: pointer;
      transition: all 0.3s ease;
    }
    
    .payment-option:hover,
    .payment-option.selected {
      border-color: #000;
      background-color: #f9f9f9;
    }
    
    .payment-option input {
      margin-right: 8px;
    }
    
    .payment-details {
      border: 1px solid #eee;
      border-radius: 4px;
      padding: 20px;
      background: #fafafa;
    }
    
    .place-order-btn {
      width: 100%;
      padding: 16px;
      font-size: 1.1rem;
      margin-top: 20px;
    }
    
    .checkout-summary {
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
    
    .order-items {
      margin-bottom: 20px;
    }
    
    .order-item {
      display: grid;
      grid-template-columns: 60px 1fr auto;
      gap: 12px;
      padding: 12px 0;
      border-bottom: 1px solid #eee;
    }
    
    .order-item:last-child {
      border-bottom: none;
    }
    
    .item-thumb {
      width: 50px;
      height: 50px;
    }
    
    .item-thumb img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      border-radius: 4px;
    }
    
    .item-info {
      display: flex;
      flex-direction: column;
      gap: 4px;
    }
    
    .item-info h4 {
      font-weight: 500;
      font-size: 0.95rem;
    }
    
    .item-info p {
      font-size: 0.85rem;
      color: #666;
    }
    
    .item-total {
      font-weight: 500;
    }
    
    .summary-breakdown {
      margin-top: 20px;
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
    
    @media (max-width: 768px) {
      .checkout-content {
        grid-template-columns: 1fr;
        gap: 30px;
      }
      
      .form-row {
        grid-template-columns: 1fr;
      }
    }
  `]
})
export class CheckoutComponent implements OnInit {
  selectedPaymentMethod = 'card';
  cartItems = [
    {
      id: 1,
      name: 'Camisa Blanca Clásica',
      image: 'https://placehold.co/300x300/f5f5f5/333333?text=Product+1',
      price: 89.99,
      quantity: 1,
      size: 'M',
      color: 'White'
    },
    {
      id: 2,
      name: 'Jeans Slim Fit',
      image: 'https://placehold.co/300x300/f5f5f5/333333?text=Product+2',
      price: 79.99,
      quantity: 2,
      size: 'L',
      color: 'Blue'
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

  placeOrder() {
    console.log('Placing order...');
    // In a real app, this would process the payment and create the order
    alert('Order placed successfully!');
  }
}