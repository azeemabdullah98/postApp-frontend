import { Component, Input, Output, EventEmitter, inject } from '@angular/core';
import { ProductService } from '../products/products.service';
import { FormsModule } from '@angular/forms';
import { Item } from '../products/product/item.model';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-header',
  imports: [FormsModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent {
  @Output() auth = new EventEmitter<string>();
  @Output() searchedProducts = new EventEmitter<Item[]>();
  isLoginSelected = true;
  authType = '';
  keyword = '';
  products: Item[] = [];
  // productData = dummyProducts;

  constructor(private productService: ProductService) {}

  private authService = inject(AuthService);

  onSignup() {
    this.authType = 'Signup';
    this.auth.emit(this.authType);
  }

  onLogin() {
    this.authType = 'Login';
    this.auth.emit(this.authType);
  }

  onAddProduct() {
    this.authType = 'Add Product';
    this.auth.emit(this.authType);
  }

  onFavourite() {
    this.authType = 'Favourites';
    this.auth.emit(this.authType);
  }

  onAccountInfo() {
    this.authType = 'Account Info';
    this.auth.emit(this.authType);
  }

  // get likedCount() {
  //   return this.productData.filter((product) => product.isLiked).length;
  // }

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

  get isLoggedIn() {
    return this.authService.getUser() !== null;
  }
}
