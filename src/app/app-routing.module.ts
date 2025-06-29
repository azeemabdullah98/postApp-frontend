import { RouterModule, Routes } from '@angular/router';
import { SignupComponent } from './auth/signup/signup.component';
import { LoginComponent } from './auth/login/login.component';
import { ProductsComponent } from './products/products.component';
import { NgModule } from '@angular/core';

const routes: Routes = [
  { path: 'register', component: SignupComponent },
  { path: 'login', component: LoginComponent },
  { path: '', component: ProductsComponent },
  //   { path: '', redirectTo: 'login', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
