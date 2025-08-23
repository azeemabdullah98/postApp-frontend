import {
  Component,
  Input,
  Output,
  EventEmitter,
  inject,
  OnInit,
} from '@angular/core';
import { ProductService } from '../products/products.service';
import { FormsModule } from '@angular/forms';
import { Item } from '../products/product/item.model';
import { AuthService } from '../auth/auth.service';
import { CommonModule } from '@angular/common';
import { UserProductsService } from '../products/favourites/user-products.service';
import { Router } from '@angular/router';
import { ProductsComponent } from '../products/products.component';

@Component({
  selector: 'app-header',
  imports: [FormsModule, CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent {
  @Output() search = new EventEmitter<string>();
  isLoginSelected = true;
  authType = '';
  products: Item[] = [];
  favProductsSize: number | undefined = 0;
  showLogoutModal = false;
  // productData = dummyProducts;

  constructor(private productService: ProductService, private router: Router) {}

  private authService = inject(AuthService);
  private userProductService = inject(UserProductsService);

  ngOnInit() {
    const user = JSON.parse(localStorage.getItem('userData')!);
    this.userProductService.getUserProducts(user.id).subscribe({
      next: (response) => {
        this.userProductService.setUserProduct(response as any[]);
        this.favProductsSize = (response as any[]).length;
      },
    });
  }

  onSignup() {
    this.router.navigateByUrl('/signup');
  }

  onLogin() {
    this.router.navigateByUrl('/login');
  }

  onAddProduct() {
    this.router.navigateByUrl('/addproduct');
  }

  onFavourite() {
    this.router.navigateByUrl('/favourites');
  }

  onAccountInfo() {
    this.router.navigateByUrl('/account-info');
  }

  searchProducts(keyword: string) {
    this.search.emit(keyword);
  }

  onLogout() {
    this.authService.setUser(null);
    localStorage.removeItem('userData');
    localStorage.removeItem('userProductData');
    this.closeLogoutModal();
  }

  get isLoggedIn() {
    return this.authService.getUser() !== null;
  }

  openLogoutModal() {
    this.showLogoutModal = true;
  }

  closeLogoutModal() {
    this.showLogoutModal = false;
  }
}
