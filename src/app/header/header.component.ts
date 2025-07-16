import { Component, Input, Output, EventEmitter } from '@angular/core';
import { ProductService } from '../products/products.service';
import { FormsModule } from '@angular/forms';
import { Item } from '../products/product/item.model';

@Component({
  selector: 'app-header',
  imports: [FormsModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent {
  @Input() isLoggedIn!: boolean;
  @Output() auth = new EventEmitter<string>();
  @Output() searchedProducts = new EventEmitter<Item[]>();
  isLoginSelected = true;
  authType = '';
  keyword = '';
  products: Item[] = [];
  // productData = dummyProducts;

  constructor(private productService: ProductService) {}

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
}
