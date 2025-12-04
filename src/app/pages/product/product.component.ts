import { Component, OnInit } from '@angular/core';
import { RouterLink, ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [RouterLink, CommonModule],
  template: `
    <div class="container">
      <div class="product-detail">
        <div class="product-images">
          <div class="main-image">
            <img [src]="product.image" [alt]="product.name" class="image">
          </div>
          <div class="thumbnails">
            <div *ngFor="let img of product.images; let i = index" 
              class="thumbnail" 
              [class.active]="selectedImage === i"
              (click)="selectImage(i)"
            >
              <img [src]="img" alt="Thumbnail {{ i + 1 }}">
            </div>
          </div>
        </div>
        
        <div class="product-info">
          <div class="product-breadcrumb">
            <a routerLink="/shop">Tienda</a> > 
            <a routerLink="/shop" [queryParams]="{category: product.category}">{{ product.category }}</a> > 
            <span>{{ product.name }}</span>
          </div>
          
          <h1 class="product-title">{{ product.name }}</h1>
          <div class="product-price">
            <span class="current-price">MX\${{ product.price }}</span>
            <span *ngIf="product.compareAtPrice" class="original-price">MX\${{ product.compareAtPrice }}</span>
          </div>
          
          <p class="product-description">{{ product.description }}</p>
          
          <div class="product-variants">
            <div class="variant-group">
              <label>Talla</label>
              <div class="size-selector">
                <button *ngFor="let size of availableSizes"
                  class="size-option"
                  [class.selected]="selectedSize === size"
                  (click)="selectSize(size)"
                >
                  {{ size }}
                </button>
              </div>
            </div>
            
            <div class="variant-group">
              <label>Color</label>
              <div class="color-selector">
                <button *ngFor="let color of availableColors"
                  class="color-option"
                  [class.selected]="selectedColor.name === color.name"
                  [style.backgroundColor]="color.value"
                  (click)="selectColor(color)"
                  [attr.title]="color.name"
                ></button>
              </div>
            </div>
          </div>
          
          <div class="quantity-selector">
            <label>Cantidad</label>
            <div class="quantity-controls">
              <button (click)="decreaseQuantity()" class="quantity-btn">-</button>
              <span class="quantity-value">{{ quantity }}</span>
              <button (click)="increaseQuantity()" class="quantity-btn">+</button>
            </div>
          </div>
          
          <div class="product-actions">
            <button class="btn btn-primary add-to-cart-btn" (click)="addToCart()">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <circle cx="9" cy="21" r="1"></circle>
                <circle cx="20" cy="21" r="1"></circle>
                <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
              </svg>
              Añadir al carrito
            </button>
            <button class="btn btn-outline wishlist-btn">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
              </svg>
              Añadir a favoritos
            </button>
          </div>
          
          <div class="product-details">
            <h3>Detalles del producto</h3>
            <ul>
              <li>Material: {{ product.material }}</li>
              <li>Cuidado: {{ product.care }}</li>
              <li>Corte: {{ product.fit }}</li>
              <li>Origen: {{ product.origin }}</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .product-detail {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 60px;
      padding: 60px 0;
    }
    
    .product-images {
      position: sticky;
      top: 100px;
    }
    
    .main-image {
      margin-bottom: 20px;
    }
    
    .image {
      width: 100%;
      height: 500px;
      object-fit: cover;
      border-radius: 8px;
    }
    
    .thumbnails {
      display: flex;
      gap: 12px;
      justify-content: center;
    }
    
    .thumbnail {
      width: 80px;
      height: 80px;
      border-radius: 8px;
      overflow: hidden;
      cursor: pointer;
      border: 2px solid transparent;
      transition: all 0.3s ease;
    }
    
    .thumbnail:hover,
    .thumbnail.active {
      border-color: #000;
    }
    
    .thumbnail img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
    
    .product-breadcrumb {
      font-size: 0.9rem;
      color: #666;
      margin-bottom: 8px;
    }
    
    .product-breadcrumb a {
      color: #000;
      transition: color 0.3s ease;
    }
    
    .product-breadcrumb a:hover {
      color: #666;
    }
    
    .product-title {
      font-size: 2rem;
      font-weight: 600;
      margin-bottom: 16px;
    }
    
    .product-price {
      display: flex;
      align-items: center;
      gap: 12px;
      margin-bottom: 20px;
      font-size: 1.5rem;
      font-weight: 600;
    }
    
    .original-price {
      font-size: 1.2rem;
      color: #999;
      text-decoration: line-through;
    }
    
    .product-description {
      color: #555;
      line-height: 1.8;
      margin-bottom: 30px;
    }
    
    .variant-group {
      margin-bottom: 24px;
    }
    
    .variant-group label {
      display: block;
      font-weight: 500;
      margin-bottom: 8px;
      color: #333;
    }
    
    .size-selector {
      display: flex;
      gap: 8px;
      flex-wrap: wrap;
    }
    
    .size-option {
      padding: 8px 16px;
      border: 1px solid #ddd;
      border-radius: 4px;
      background: white;
      cursor: pointer;
      transition: all 0.3s ease;
    }
    
    .size-option:hover {
      border-color: #000;
    }
    
    .size-option.selected {
      background-color: #000;
      color: white;
      border-color: #000;
    }
    
    .color-selector {
      display: flex;
      gap: 12px;
    }
    
    .color-option {
      width: 30px;
      height: 30px;
      border-radius: 50%;
      border: 2px solid #ddd;
      cursor: pointer;
      transition: all 0.3s ease;
    }
    
    .color-option:hover {
      border-color: #000;
      transform: scale(1.1);
    }
    
    .color-option.selected {
      border-color: #000;
      transform: scale(1.1);
    }
    
    .quantity-selector {
      margin-bottom: 24px;
    }
    
    .quantity-selector label {
      display: block;
      font-weight: 500;
      margin-bottom: 8px;
      color: #333;
    }
    
    .quantity-controls {
      display: flex;
      align-items: center;
      gap: 12px;
    }
    
    .quantity-btn {
      width: 40px;
      height: 40px;
      border: 1px solid #ddd;
      background: white;
      border-radius: 4px;
      font-size: 1.2rem;
      cursor: pointer;
      transition: all 0.3s ease;
    }
    
    .quantity-btn:hover {
      border-color: #000;
    }
    
    .quantity-value {
      font-weight: 500;
      min-width: 40px;
      text-align: center;
    }
    
    .product-actions {
      display: flex;
      gap: 16px;
      margin-bottom: 30px;
      flex-wrap: wrap;
    }
    
    .add-to-cart-btn {
      flex: 1;
      padding: 14px;
      font-size: 1.1rem;
    }
    
    .wishlist-btn {
      padding: 14px 20px;
    }
    
    .product-details {
      border-top: 1px solid #eee;
      padding-top: 30px;
    }
    
    .product-details h3 {
      font-size: 1.2rem;
      margin-bottom: 16px;
    }
    
    .product-details ul {
      list-style: none;
    }
    
    .product-details li {
      padding: 6px 0;
      color: #555;
    }
    
    @media (max-width: 768px) {
      .product-detail {
        grid-template-columns: 1fr;
        gap: 30px;
        padding: 40px 0;
      }
      
      .image {
        height: 300px;
      }
      
      .product-actions {
        flex-direction: column;
      }
    }
  `]
})
export class ProductComponent implements OnInit {
  product: any = {};
  selectedImage = 0;
  selectedSize = '';
  selectedColor = { name: '', value: '' };
  quantity = 1;
  availableSizes = ['XS', 'S', 'M', 'L', 'XL'];
  availableColors = [
    { name: 'Black', value: '#000000' },
    { name: 'White', value: '#FFFFFF' },
    { name: 'Navy', value: '#000080' },
    { name: 'Gray', value: '#808080' }
  ];

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    // In a real app, we would get the product ID from the route and fetch the product
    this.product = {
      id: 1,
      name: 'Camisa Blanca Clásica',
      description: 'Diseño atemporal en algodón premium. Ideal para cualquier ocasión, combina comodidad y estilo con una textura suave y corte entallado.',
      price: 1799.00,
      compareAtPrice: 2399.00,
      image: 'https://placehold.co/600x600/f5f5f5/333333?text=Detalle+Producto',
      images: [
        'https://placehold.co/600x600/f5f5f5/333333?text=Detalle+Producto',
        'https://placehold.co/600x600/e0e0e0/333333?text=Detalle+Producto+2',
        'https://placehold.co/600x600/d0d0d0/333333?text=Detalle+Producto+3'
      ],
      category: 'shirts',
      material: '100% algodón',
      care: 'Lavar a máquina en frío, secar a baja temperatura',
      fit: 'Corte regular',
      origin: 'Hecho en México'
    };
    
    this.selectedColor = this.availableColors[0];
    this.selectedSize = this.availableSizes[2]; // Default to M
  }

  selectImage(index: number) {
    this.selectedImage = index;
  }

  selectSize(size: string) {
    this.selectedSize = size;
  }

  selectColor(color: any) {
    this.selectedColor = color;
  }

  increaseQuantity() {
    this.quantity++;
  }

  decreaseQuantity() {
    if (this.quantity > 1) {
      this.quantity--;
    }
  }

  addToCart() {
    console.log('Adding to cart:', {
      product: this.product,
      size: this.selectedSize,
      color: this.selectedColor.name,
      quantity: this.quantity
    });
    // In a real app, this would dispatch an action to add the product to cart
  }
}