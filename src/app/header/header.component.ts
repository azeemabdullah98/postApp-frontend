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

@Component({
  selector: 'app-header',
  imports: [FormsModule, CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent {
  // @Output() auth = new EventEmitter<string>();
  @Output() searchedProducts = new EventEmitter<Item[]>();
  isLoginSelected = true;
  authType = '';
  keyword = '';
  products: Item[] = [];
  favProductsSize: number | undefined = 0;
  showLogoutModal = false;
  // productData = dummyProducts;

  constructor(private productService: ProductService, private router: Router) {}

  ngOnChange() {
    if (this.isLoggedIn) {
      this.userProductService.setUserProduct(
        JSON.parse(localStorage.getItem('userProductData')!)
      );
      this.favProductsSize = this.userProductService.getUserProduct().length;
    }
  }

  private authService = inject(AuthService);
  private userProductService = inject(UserProductsService);

  onSignup() {
    this.router.navigateByUrl('/signup');
    this.authType = 'Signup';
    // this.auth.emit(this.authType);
  }

  onLogin() {
    this.router.navigateByUrl('/login');
    this.authType = 'Login';
    // this.auth.emit(this.authType);
  }

  onAddProduct() {
    this.router.navigateByUrl('/addproduct');
    this.authType = 'Add Product';
    // this.auth.emit(this.authType);
  }

  onFavourite() {
    this.router.navigateByUrl('/favourites');
    this.authType = 'Favourites';
    // this.auth.emit(this.authType);
  }

  onAccountInfo() {
    this.router.navigateByUrl('/account-info');
    this.authType = 'Account Info';
    // this.auth.emit(this.authType);
  }

  onSearch() {
    this.productService.searchProducts(this.keyword).subscribe((data) => {
      console.log(data);
      this.products = data;
      this.searchedProducts.emit(this.products);
    });
  }

  onKeyDown($event: KeyboardEvent) {
    if ($event.key === 'Enter') {
      this.onSearch();
    }
  }

  onLogout() {
    // console.log('logout clicked');
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
