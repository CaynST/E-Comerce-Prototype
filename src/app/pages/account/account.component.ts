import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-account',
  standalone: true,
  imports: [RouterLink, CommonModule],
  template: `
    <div class="container">
      <div class="account-header">
        <h1 class="section-title">Mi cuenta</h1>
        <p class="section-subtitle">Gestiona tu perfil y pedidos</p>
      </div>

      <div class="account-content">
        <div class="account-nav">
          <nav>
            <a *ngFor="let tab of tabs" 
              [class.active]="activeTab === tab.id"
              (click)="setActiveTab(tab.id)"
              class="nav-link"
            >
              {{ tab.title }}
            </a>
          </nav>
        </div>

        <div class="account-main">
          <div *ngIf="activeTab === 'profile'" class="tab-content">
            <h2>Información del Perfil</h2>
            <form class="profile-form">
              <div class="form-row">
                <div class="form-group">
                  <label for="firstName">Nombre</label>
                  <input type="text" id="firstName" class="form-control" value="Juan">
                </div>
                <div class="form-group">
                  <label for="lastName">Apellido</label>
                  <input type="text" id="lastName" class="form-control" value="Pérez">
                </div>
              </div>

              <div class="form-group">
                <label for="email">Correo Electrónico</label>
                <input type="email" id="email" class="form-control" value="juan_perez@example.com">
              </div>

              <div class="form-group">
                <label for="phone">Número de Teléfono</label>
                <input type="tel" id="phone" class="form-control" value="+52 (55) 1234-5678">
              </div>

              <button class="btn btn-primary">Actualizar Perfil</button>
            </form>
          </div>

          <div *ngIf="activeTab === 'orders'" class="tab-content">
            <h2>Historial de Pedidos</h2>
            <div class="orders-list">
              <div *ngFor="let order of orders" class="order-card card">
                <div class="order-header">
                  <div class="order-id">Pedido #{{ order.id }}</div>
                  <div class="order-date">{{ order.date }}</div>
                  <div class="order-status" [class]="'status-' + order.status.toLowerCase()">{{ order.status }}</div>
                </div>

                <div class="order-items">
                  <div *ngFor="let item of order.items" class="order-item">
                    <div class="item-thumb">
                      <img [src]="item.image" [alt]="item.name">
                    </div>
                    <div class="item-info">
                      <h4>{{ item.name }}</h4>
                      <p>{{ item.quantity }} x \${{ item.price }}</p>
                    </div>
                    <div class="item-total">\${{ (item.price * item.quantity).toFixed(2) }}</div>
                  </div>
                </div>

                <div class="order-summary">
                  <div class="summary-row">
                    <span>Total</span>
                    <span class="total-amount">\${{ order.total.toFixed(2) }}</span>
                  </div>
                </div>

                <div class="order-actions">
                  <button class="btn btn-outline">Ver Detalles</button>
                  <button class="btn btn-secondary">Reordenar</button>
                </div>
              </div>
            </div>
          </div>

          <div *ngIf="activeTab === 'addresses'" class="tab-content">
            <h2>Direcciones de Envío</h2>
            <div class="addresses-list">
              <div *ngFor="let address of addresses" class="address-card card">
                <div class="address-info">
                  <h3>{{ address.name }}</h3>
                  <p>{{ address.street }}</p>
                  <p>{{ address.city }}, {{ address.state }} {{ address.zip }}</p>
                  <p>{{ address.country }}</p>
                </div>
                <div class="address-actions">
                  <button class="btn btn-outline">Editar</button>
                  <button class="btn btn-secondary">Eliminar</button>
                </div>
              </div>
            </div>

            <button class="btn btn-outline add-address-btn">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <line x1="12" y1="5" x2="12" y2="19"></line>
                <line x1="5" y1="12" x2="19" y2="12"></line>
              </svg>
              Añadir nueva dirección
            </button>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .account-header {
      text-align: center;
      margin-bottom: 40px;
    }
    
    .account-content {
      display: grid;
      grid-template-columns: 200px 1fr;
      gap: 40px;
    }
    
    .account-nav {
      background: #f9f9f9;
      border-radius: 8px;
      padding: 20px 0;
    }
    
    .nav-link {
      display: block;
      padding: 12px 20px;
      cursor: pointer;
      transition: all 0.3s ease;
      font-weight: 500;
    }
    
    .nav-link:hover,
    .nav-link.active {
      background: #000;
      color: white;
    }
    
    .account-main {
      background: #f9f9f9;
      border-radius: 8px;
      padding: 30px;
    }
    
    .tab-content h2 {
      margin-bottom: 20px;
      font-size: 1.5rem;
    }
    
    .profile-form {
      max-width: 600px;
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
    
    .orders-list {
      display: flex;
      flex-direction: column;
      gap: 20px;
    }
    
    .order-card {
      padding: 20px;
    }
    
    .order-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 16px;
      flex-wrap: wrap;
      gap: 10px;
    }
    
    .order-id {
      font-weight: 600;
    }
    
    .order-status {
      padding: 4px 12px;
      border-radius: 20px;
      font-size: 0.85rem;
      font-weight: 500;
    }
    
    .status-pending {
      background: #fff3cd;
      color: #856404;
    }
    
    .status-processing {
      background: #cce5ff;
      color: #004085;
    }
    
    .status-shipped {
      background: #d4edda;
      color: #155724;
    }
    
    .status-delivered {
      background: #d1ecf1;
      color: #0c5460;
    }
    
    .order-items {
      margin-bottom: 16px;
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
    
    .order-summary {
      margin: 16px 0;
      padding: 16px 0;
      border-top: 1px solid #eee;
      border-bottom: 1px solid #eee;
    }
    
    .summary-row {
      display: flex;
      justify-content: space-between;
    }
    
    .order-actions {
      display: flex;
      gap: 12px;
      justify-content: flex-end;
    }
    
    .addresses-list {
      display: flex;
      flex-direction: column;
      gap: 20px;
      margin-bottom: 30px;
    }
    
    .address-card {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 20px;
      flex-wrap: wrap;
      gap: 20px;
    }
    
    .address-info {
      flex: 1;
    }
    
    .address-info h3 {
      margin-bottom: 8px;
    }
    
    .address-actions {
      display: flex;
      gap: 12px;
    }
    
    .add-address-btn {
      display: flex;
      align-items: center;
      gap: 8px;
    }
    
    @media (max-width: 768px) {
      .account-content {
        grid-template-columns: 1fr;
        gap: 20px;
      }
      
      .account-nav {
        display: flex;
        gap: 8px;
        overflow-x: auto;
        padding: 10px;
      }
      
      .nav-link {
        white-space: nowrap;
        padding: 8px 16px;
        font-size: 0.9rem;
      }
      
      .order-header {
        flex-direction: column;
        align-items: flex-start;
      }
      
      .order-actions {
        width: 100%;
        justify-content: flex-start;
      }
      
      .address-card {
        flex-direction: column;
        align-items: flex-start;
      }
      
      .address-actions {
        width: 100%;
        justify-content: flex-end;
      }
    }
  `]
})
export class AccountComponent {
  tabs = [
    { id: 'profile', title: 'Perfil' },
    { id: 'orders', title: 'Pedidos' },
    { id: 'addresses', title: 'Direcciones' }
  ];
  
  activeTab = 'profile';
  
  orders = [
    {
      id: '1001',
      date: '2023-11-15',
      status: 'Entregado',
      total: 249.97,
      items: [
        {
          name: 'Camisa Blanca Clásica',
          image: 'https://placehold.co/300x300/f5f5f5/333333?text=Product+1',
          price: 89.99,
          quantity: 1
        },
        {
          name: 'Jeans Slim Fit',
          image: 'https://placehold.co/300x300/f5f5f5/333333?text=Product+2',
          price: 79.99,
          quantity: 2
        }
      ]
    },
    {
      id: '1002',
      date: '2023-10-22',
      status: 'Enviado',
      total: 149.99,
      items: [
        {
          name: 'Suéter de Cachemira',
          image: 'https://placehold.co/300x300/f5f5f5/333333?text=Product+3',
          price: 149.99,
          quantity: 1
        }
      ]
    },
    {
      id: '1003',
      date: '2023-09-30',
      status: 'Procesando',
      total: 329.96,
      items: [
        {
          name: 'Chaqueta de Cuero',
          image: 'https://placehold.co/300x300/f5f5f5/333333?text=Product+4',
          price: 249.99,
          quantity: 1
        },
        {
          name: 'Bolso de Diseñador',
          image: 'https://placehold.co/300x300/f5f5f5/333333?text=Product+8',
          price: 79.97,
          quantity: 1
        }
      ]
    }
  ];
  
  addresses = [
    {
      id: 1,
      name: 'Dirección de Casa',
      street: 'Norte 13 Calle Principal',
      city: 'Córdoba',
      state: 'Veracruz',
      zip: '10001',
      country: 'México'
    },
    {
      id: 2,
      name: 'Dirección de Trabajo',
      street: 'Avenida Empresarial 456',
      city: 'Córdoba',
      state: 'Veracruz',
      zip: '10002',
      country: 'México'
    }
  ];
  
  setActiveTab(tabId: string) {
    this.activeTab = tabId;
  }
}