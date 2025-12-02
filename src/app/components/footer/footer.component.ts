import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [RouterLink],
  template: `
    <footer class="footer">
      <div class="container">
        <div class="footer-content">
          <div class="footer-section">
            <h3 class="footer-title">ELEGANT</h3>
            <p class="footer-text">Modern clothing for the contemporary individual. Quality, style, and sustainability in every piece.</p>
          </div>
          
          <div class="footer-section">
            <h4 class="footer-subtitle">Shop</h4>
            <ul class="footer-links">
              <li><a routerLink="/shop">All Products</a></li>
              <li><a routerLink="/shop">New Arrivals</a></li>
              <li><a routerLink="/shop">Best Sellers</a></li>
              <li><a routerLink="/shop">Sale</a></li>
            </ul>
          </div>
          
          <div class="footer-section">
            <h4 class="footer-subtitle">Customer Service</h4>
            <ul class="footer-links">
              <li><a routerLink="/account">Contact Us</a></li>
              <li><a routerLink="/account">Shipping Policy</a></li>
              <li><a routerLink="/account">Returns & Exchanges</a></li>
              <li><a routerLink="/account">FAQ</a></li>
            </ul>
          </div>
          
          <div class="footer-section">
            <h4 class="footer-subtitle">Connect</h4>
            <div class="social-links">
              <a href="#" aria-label="Instagram">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                </svg>
              </a>
              <a href="#" aria-label="Twitter">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"></path>
                </svg>
              </a>
              <a href="#" aria-label="Facebook">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
                </svg>
              </a>
            </div>
          </div>
        </div>
        
        <div class="footer-bottom">
          <p>&copy; {{ currentYear }} Elegant Boutique. All rights reserved.</p>
        </div>
      </div>
    </footer>
  `,
  styles: [`
    .footer {
      background-color: #000;
      color: white;
      padding: 60px 0 30px;
      margin-top: auto;
    }
    
    .footer-content {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
      gap: 40px;
      margin-bottom: 40px;
    }
    
    .footer-section h3,
    .footer-section h4 {
      margin-bottom: 16px;
      font-weight: 500;
    }
    
    .footer-title {
      font-size: 1.5rem;
      font-weight: 700;
    }
    
    .footer-subtitle {
      font-size: 1rem;
      text-transform: uppercase;
      letter-spacing: 1px;
    }
    
    .footer-text {
      color: #ccc;
      line-height: 1.6;
    }
    
    .footer-links {
      list-style: none;
    }
    
    .footer-links li {
      margin-bottom: 12px;
    }
    
    .footer-links a {
      color: #ccc;
      text-decoration: none;
      transition: color 0.3s ease;
    }
    
    .footer-links a:hover {
      color: white;
    }
    
    .social-links {
      display: flex;
      gap: 16px;
    }
    
    .social-links a {
      color: #ccc;
      transition: color 0.3s ease;
    }
    
    .social-links a:hover {
      color: white;
    }
    
    .footer-bottom {
      border-top: 1px solid #333;
      padding-top: 20px;
      text-align: center;
      color: #999;
    }
    
    @media (max-width: 768px) {
      .footer-content {
        grid-template-columns: 1fr;
        gap: 30px;
      }
    }
  `]
})
export class FooterComponent {
  currentYear = new Date().getFullYear();
}