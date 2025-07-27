import { Component } from '@angular/core';
import { HeaderComponent } from './header/header.component';
import { ProductsComponent } from './products/products.component';
import { LoginComponent } from './auth/login/login.component';
import { SignupComponent } from './auth/signup/signup.component';
import { FavouritesComponent } from './products/favourites/favourites.component';
import { NewProductComponent } from './products/new-product/new-product.component';
import { UserAccountComponent } from './auth/user-account/user-account.component';
import { Item } from './products/product/item.model';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [HeaderComponent, RouterModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  searchProducts: Item[] = [];

  onSearchProducts(products: Item[]) {
    this.searchProducts = products;
  }
}
