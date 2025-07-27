import { Routes } from '@angular/router';
import { ProductsComponent } from './products/products.component';
import { LoginComponent } from './auth/login/login.component';
import { SignupComponent } from './auth/signup/signup.component';
import { NewProductComponent } from './products/new-product/new-product.component';
import { UserAccountComponent } from './auth/user-account/user-account.component';
import { FavouritesComponent } from './products/favourites/favourites.component';
import { ProductSummaryComponent } from './products/product-summary/product-summary.component';
import { ProductComponent } from './products/product/product.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'home',
    component: ProductsComponent,
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'signup',
    component: SignupComponent,
  },
  {
    path: 'addproduct',
    component: NewProductComponent,
  },
  {
    path: 'account-info',
    component: UserAccountComponent,
  },
  {
    path: 'favourites',
    component: FavouritesComponent,
  },
  {
    path: 'products/:id',
    component: ProductSummaryComponent,
  },
];
