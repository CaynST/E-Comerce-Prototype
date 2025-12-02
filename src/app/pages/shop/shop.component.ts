import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ProductCardComponent } from '../../components/product-card/product-card.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-shop',
  standalone: true,
  imports: [RouterLink, ProductCardComponent, CommonModule, FormsModule],
  template: `
    <section class="section">
      <div class="container">
        <div class="shop-header">
          <h1 class="section-title">Our Collection</h1>
          <p class="section-subtitle">Discover our curated selection of premium clothing</p>
        </div>
        
        <div class="shop-filters">
          <div class="filter-group">
            <label>Category</label>
            <select class="filter-select" [(ngModel)]="selectedCategory" (change)="applyFilters()">
              <option value="">All Categories</option>
              <option value="shirts">Shirts</option>
              <option value="pants">Pants</option>
              <option value="dresses">Dresses</option>
              <option value="jackets">Jackets</option>
              <option value="accessories">Accessories</option>
            </select>
          </div>
          
          <div class="filter-group">
            <label>Price Range</label>
            <select class="filter-select" [(ngModel)]="selectedPriceRange" (change)="applyFilters()">
              <option value="">All Prices</option>
              <option value="0-50">$0 - $50</option>
              <option value="50-100">$50 - $100</option>
              <option value="100-200">$100 - $200</option>
              <option value="200+">$200+</option>
            </select>
          </div>
          
          <div class="filter-group">
            <label>Sort By</label>
            <select class="filter-select" [(ngModel)]="sortOption" (change)="applyFilters()">
              <option value="featured">Featured</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="newest">Newest Arrivals</option>
            </select>
          </div>
        </div>
        
        <div class="product-grid">
          @for (product of filteredProducts; track product.id) {
            <app-product-card 
              [product]="product" 
              (addToCartEvent)="addToCart($event)"
            ></app-product-card>
          }
        </div>
        
        @if (filteredProducts.length === 0) {
          <div class="no-products">
            <h3>No products found</h3>
            <p>Try adjusting your filters to see more results.</p>
            <button class="btn btn-outline" (click)="resetFilters()">Reset Filters</button>
          </div>
        }
      </div>
    </section>
  `,
  styles: [`
    .shop-header {
      text-align: center;
      margin-bottom: 40px;
    }
    
    .shop-filters {
      display: flex;
      gap: 20px;
      margin-bottom: 40px;
      flex-wrap: wrap;
      justify-content: center;
    }
    
    .filter-group {
      display: flex;
      flex-direction: column;
      gap: 8px;
    }
    
    .filter-group label {
      font-weight: 500;
      font-size: 0.9rem;
      color: #555;
    }
    
    .filter-select {
      padding: 8px 12px;
      border: 1px solid #ddd;
      border-radius: 4px;
      font-size: 0.9rem;
      background-color: white;
      outline: none;
      transition: border-color 0.3s ease;
    }
    
    .filter-select:focus {
      border-color: #000;
    }
    
    .no-products {
      text-align: center;
      padding: 60px 20px;
    }
    
    .no-products h3 {
      font-size: 1.5rem;
      margin-bottom: 16px;
    }
    
    .no-products p {
      color: #666;
      margin-bottom: 20px;
    }
    
    @media (max-width: 768px) {
      .shop-filters {
        flex-direction: column;
      }
      
      .filter-group {
        width: 100%;
      }
    }
  `]
})
export class ShopComponent implements OnInit {
  products = [
    {
      id: 1,
      name: 'Classic White Shirt',
      description: 'Timeless design with premium cotton fabric',
      price: 89.99,
      compareAtPrice: 119.99,
      image: 'https://placehold.co/300x300/f5f5f5/333333?text=Product+1',
      category: 'shirts',
      badge: 'Best Seller'
    },
    {
      id: 2,
      name: 'Slim Fit Jeans',
      description: 'Perfect fit with stretch denim',
      price: 79.99,
      image: 'https://placehold.co/300x300/f5f5f5/333333?text=Product+2',
      category: 'pants',
      badge: 'New'
    },
    {
      id: 3,
      name: 'Cashmere Sweater',
      description: 'Luxurious feel with premium materials',
      price: 149.99,
      compareAtPrice: 199.99,
      image: 'https://placehold.co/300x300/f5f5f5/333333?text=Product+3',
      category: 'dresses'
    },
    {
      id: 4,
      name: 'Leather Jacket',
      description: 'Genuine leather with modern cut',
      price: 249.99,
      image: 'https://placehold.co/300x300/f5f5f5/333333?text=Product+4',
      category: 'jackets'
    },
    {
      id: 5,
      name: 'Silk Blouse',
      description: 'Elegant silk with delicate details',
      price: 129.99,
      image: 'https://placehold.co/300x300/f5f5f5/333333?text=Product+5',
      category: 'dresses'
    },
    {
      id: 6,
      name: 'Wool Coat',
      description: 'Warm and stylish winter coat',
      price: 199.99,
      compareAtPrice: 249.99,
      image: 'https://placehold.co/300x300/f5f5f5/333333?text=Product+6',
      category: 'jackets'
    },
    {
      id: 7,
      name: 'Cotton T-Shirt',
      description: 'Comfortable everyday essential',
      price: 29.99,
      image: 'https://placehold.co/300x300/f5f5f5/333333?text=Product+7',
      category: 'shirts'
    },
    {
      id: 8,
      name: 'Designer Handbag',
      description: 'Premium leather accessory',
      price: 179.99,
      image: 'https://placehold.co/300x300/f5f5f5/333333?text=Product+8',
      category: 'accessories'
    }
  ];

  filteredProducts = [...this.products];
  selectedCategory = '';
  selectedPriceRange = '';
  sortOption = 'featured';

  ngOnInit(): void {
    this.applyFilters();
  }

  applyFilters() {
    let result = [...this.products];

    // Apply category filter
    if (this.selectedCategory) {
      result = result.filter(product => product.category === this.selectedCategory);
    }

    // Apply price range filter
    if (this.selectedPriceRange) {
      const [min, max] = this.selectedPriceRange.split('-');
      if (max) {
        result = result.filter(product => product.price >= parseFloat(min) && product.price <= parseFloat(max));
      } else {
        result = result.filter(product => product.price >= parseFloat(min));
      }
    }

    // Apply sorting
    switch (this.sortOption) {
      case 'price-low':
        result.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        result.sort((a, b) => b.price - a.price);
        break;
      case 'newest':
        // In a real app, we would sort by date added
        break;
      default:
        // Featured sorting would be implemented here
        break;
    }

    this.filteredProducts = result;
  }

  resetFilters() {
    this.selectedCategory = '';
    this.selectedPriceRange = '';
    this.sortOption = 'featured';
    this.applyFilters();
  }

  addToCart(product: any) {
    console.log('Adding to cart:', product);
    // In a real app, this would dispatch an action to add the product to cart
  }
}