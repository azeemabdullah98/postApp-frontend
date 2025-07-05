import { Component, Input, Output, EventEmitter } from '@angular/core';
import { dummyProducts } from '../products/dummy-products';

@Component({
  selector: 'app-header',
  imports: [],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent {
  @Input() isLoggedIn!: boolean;
  @Output() auth = new EventEmitter<string>();
  isLoginSelected = true;
  authType = '';
  productData = dummyProducts;

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

  get likedCount() {
    return this.productData.filter((product) => product.isLiked).length;
  }
}
