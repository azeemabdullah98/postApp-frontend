import { Component } from '@angular/core';
import { HeaderComponent } from './header/header.component';
import { ProductsComponent } from './products/products.component';
import { LoginComponent } from './auth/login/login.component';
import { SignupComponent } from './auth/signup/signup.component';
import { FavouritesComponent } from './products/favourites/favourites.component';

@Component({
  selector: 'app-root',
  imports: [
    HeaderComponent,
    ProductsComponent,
    LoginComponent,
    SignupComponent,
    FavouritesComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  isLoginSelected = false;
  isSignupSelected = false;
  isFavouritesSelected = false;
  auth = '';

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
  }
  onCloseAuth() {
    this.auth === 'Login'
      ? (this.isLoginSelected = false)
      : this.isLoginSelected;
    this.auth === 'Signup'
      ? (this.isSignupSelected = false)
      : this.isSignupSelected;
    this.auth === 'Favourites'
      ? (this.isFavouritesSelected = false)
      : this.isFavouritesSelected;
  }
  title = 'postApp';
}
