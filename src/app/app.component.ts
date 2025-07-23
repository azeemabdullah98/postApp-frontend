import { Component } from '@angular/core';
import { HeaderComponent } from './header/header.component';
import { ProductsComponent } from './products/products.component';
import { LoginComponent } from './auth/login/login.component';
import { SignupComponent } from './auth/signup/signup.component';
import { FavouritesComponent } from './products/favourites/favourites.component';
import { NewProductComponent } from './products/new-product/new-product.component';
import { UserAccountComponent } from './auth/user-account/user-account.component';
import { Item } from './products/product/item.model';

@Component({
  selector: 'app-root',
  imports: [
    HeaderComponent,
    ProductsComponent,
    LoginComponent,
    SignupComponent,
    FavouritesComponent,
    UserAccountComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  isLoginSelected = false;
  isSignupSelected = false;
  isFavouritesSelected = false;
  isAddProductSelected = false;
  isAccountInfoSelected = false;
  auth = '';
  searchProducts: Item[] = [];

  onAuthSelected(auth: string) {
    this.auth = auth;
    this.auth === 'Login'
      ? (this.isLoginSelected = true)
      : this.isLoginSelected;
    this.auth === 'Signup'
      ? (this.isSignupSelected = true)
      : this.isSignupSelected;
    this.auth === 'Favourites'
      ? (this.isFavouritesSelected = true)
      : this.isFavouritesSelected;
    this.auth === 'Add Product'
      ? (this.isAddProductSelected = true)
      : this.isAddProductSelected;
    this.auth === 'Account Info'
      ? (this.isAccountInfoSelected = true)
      : this.isAccountInfoSelected;
    console.log(this.isAddProductSelected);
  }

  onCloseAuth(event: string) {
    this.auth = event;
    this.auth === 'Login'
      ? (this.isLoginSelected = false)
      : this.isLoginSelected;
    this.auth === 'Signup'
      ? (this.isSignupSelected = false)
      : this.isSignupSelected;
    this.auth === 'Favourites'
      ? (this.isFavouritesSelected = false)
      : this.isFavouritesSelected;
    this.auth === 'Add Product'
      ? (this.isAddProductSelected = false)
      : this.isAddProductSelected;
    this.auth === 'Account Info'
      ? (this.isAccountInfoSelected = false)
      : this.isAccountInfoSelected;
  }

  onLogin(user: any) {
    // this.userLoginData = user;
  }

  onSearchProducts(products: Item[]) {
    this.searchProducts = products;
  }
}
