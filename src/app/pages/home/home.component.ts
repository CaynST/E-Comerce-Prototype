import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ProductCardComponent } from '../../components/product-card/product-card.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink, ProductCardComponent, CommonModule],
  template: `
    <section class="hero">
      <div class="container">
        <div class="hero-content">
          <div class="hero-text">
            <h1 class="hero-title">Elevate Your Style</h1>
            <p class="hero-subtitle">Discover our curated collection of timeless pieces designed for the modern individual.</p>
            <a routerLink="/shop" class="btn btn-primary hero-btn">Shop Collection</a>
          </div>
          <div class="hero-image">
            <div class="hero-placeholder">
              <div class="hero-overlay"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
    
    <section class="featured-products section">
      <div class="container">
        <h2 class="section-title">Featured Products</h2>
        <p class="section-subtitle">Handpicked selection of our finest pieces</p>
        
        <div class="product-grid">
          @for (product of featuredProducts; track product.id) {
            <app-product-card 
              [product]="product" 
              (addToCartEvent)="addToCart($event)"
            ></app-product-card>
          }
        </div>
        
        <div class="text-center" style="margin-top: 40px;">
          <a routerLink="/shop" class="btn btn-outline">View All Products</a>
        </div>
      </div>
    </section>
    
    <section class="collections section">
      <div class="container">
        <h2 class="section-title">Collections</h2>
        <p class="section-subtitle">Explore our seasonal collections</p>
        
        <div class="collections-grid">
          <div class="collection-card card">
            <div class="collection-image">
              <div class="collection-placeholder collection-1"></div>
            </div>
            <div class="collection-content">
              <h3>Spring Essentials</h3>
              <a routerLink="/shop" class="btn btn-outline">Explore</a>
            </div>
          </div>
          
          <div class="collection-card card">
            <div class="collection-image">
              <div class="collection-placeholder collection-2"></div>
            </div>
            <div class="collection-content">
              <h3>Summer Vibes</h3>
              <a routerLink="/shop" class="btn btn-outline">Explore</a>
            </div>
          </div>
          
          <div class="collection-card card">
            <div class="collection-image">
              <div class="collection-placeholder collection-3"></div>
            </div>
            <div class="collection-content">
              <h3>Autumn Classics</h3>
              <a routerLink="/shop" class="btn btn-outline">Explore</a>
            </div>
          </div>
        </div>
      </div>
    </section>
    
    <section class="about section">
      <div class="container">
        <div class="about-content">
          <div class="about-text">
            <h2 class="section-title">Our Story</h2>
            <p>Elegant Boutique was founded with a simple mission: to provide high-quality, timeless clothing that makes every individual feel confident and stylish. We believe in sustainable fashion practices and ethical production.</p>
            <p>Each piece in our collection is carefully curated to ensure it meets our standards of quality, comfort, and style. We work with artisans who share our vision of creating beautiful, long-lasting garments.</p>
          </div>
          <div class="about-image">
            <div class="about-placeholder"></div>
          </div>
        </div>
      </div>
    </section>
  `,
  styles: [`
    .hero {
      padding: 100px 0;
      background: linear-gradient(135deg, #f8f8f8 0%, #ffffff 100%);
      position: relative;
      overflow: hidden;
    }
    
    .hero-content {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 60px;
      align-items: center;
    }
    
    .hero-title {
      font-size: 3.5rem;
      font-weight: 700;
      line-height: 1.2;
      margin-bottom: 20px;
      letter-spacing: -0.5px;
    }
    
    .hero-subtitle {
      font-size: 1.2rem;
      color: #666;
      margin-bottom: 30px;
      line-height: 1.6;
    }
    
    .hero-btn {
      padding: 14px 32px;
      font-size: 1.1rem;
    }
    
    .hero-image {
      position: relative;
    }
    
    .hero-placeholder {
      position: relative;
      height: 400px;
      background: linear-gradient(45deg, #f0f0f0, #e0e0e0);
      border-radius: 8px;
      overflow: hidden;
    }
    
    .hero-overlay {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: linear-gradient(45deg, rgba(0,0,0,0.1), rgba(0,0,0,0.05));
    }
    
    .collections-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
      gap: 30px;
      margin-top: 40px;
    }
    
    .collection-card {
      overflow: hidden;
      transition: all 0.3s ease;
    }
    
    .collection-card:hover {
      transform: translateY(-5px);
    }
    
    .collection-image {
      height: 250px;
      overflow: hidden;
    }
    
    .collection-placeholder {
      height: 100%;
      width: 100%;
      background-size: cover;
      background-position: center;
    }
    
    .collection-1 {
      background: linear-gradient(45deg, #e0e0e0, #d0d0d0);
    }
    
    .collection-2 {
      background: linear-gradient(45deg, #d0d0d0, #c0c0c0);
    }
    
    .collection-3 {
      background: linear-gradient(45deg, #c0c0c0, #b0b0b0);
    }
    
    .collection-content {
      padding: 20px;
      text-align: center;
    }
    
    .collection-content h3 {
      margin-bottom: 15px;
      font-size: 1.3rem;
    }
    
    .about-content {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 60px;
      align-items: center;
    }
    
    .about-text p {
      margin-bottom: 20px;
      line-height: 1.8;
      color: #555;
    }
    
    .about-image {
      display: flex;
      justify-content: center;
    }
    
    .about-placeholder {
      width: 100%;
      height: 300px;
      background: linear-gradient(45deg, #f0f0f0, #e0e0e0);
      border-radius: 8px;
    }
    
    @media (max-width: 768px) {
      .hero-content {
        grid-template-columns: 1fr;
        text-align: center;
      }
      
      .hero-title {
        font-size: 2.5rem;
      }
      
      .hero-btn {
        margin: 0 auto;
      }
      
      .about-content {
        grid-template-columns: 1fr;
      }
    }
  `]
})
export class HomeComponent implements OnInit {
  featuredProducts = [
    {
      id: 1,
      name: 'Classic White Shirt',
      description: 'Timeless design with premium cotton fabric',
      price: 89.99,
      compareAtPrice: 119.99,
      image: 'https://placehold.co/300x300/f5f5f5/333333?text=Product+1',
      badge: 'Best Seller'
    },
    {
      id: 2,
      name: 'Slim Fit Jeans',
      description: 'Perfect fit with stretch denim',
      price: 79.99,
      image: 'https://placehold.co/300x300/f5f5f5/333333?text=Product+2',
      badge: 'New'
    },
    {
      id: 3,
      name: 'Cashmere Sweater',
      description: 'Luxurious feel with premium materials',
      price: 149.99,
      compareAtPrice: 199.99,
      image: 'https://placehold.co/300x300/f5f5f5/333333?text=Product+3',
      badge: 'Limited'
    },
    {
      id: 4,
      name: 'Leather Jacket',
      description: 'Genuine leather with modern cut',
      price: 249.99,
      image: 'https://placehold.co/300x300/f5f5f5/333333?text=Product+4'
    }
  ];

  ngOnInit(): void {
    // Initialize component
  }

  addToCart(product: any) {
    console.log('Adding to cart:', product);
    // In a real app, this would dispatch an action to add the product to cart
  }
}