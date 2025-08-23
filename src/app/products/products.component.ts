import { Component, Input, EventEmitter, Output, OnInit } from '@angular/core';
import { ProductComponent } from './product/product.component';
import { ProductSummaryComponent } from './product-summary/product-summary.component';
import { ProductService } from './products.service';
import { Item } from './product/item.model';

import { ActivatedRoute, Router } from '@angular/router';
import { HeaderComponent } from '../header/header.component';
import { UserProductsService } from './favourites/user-products.service';

@Component({
  selector: 'app-products',
  imports: [ProductComponent, HeaderComponent],
  templateUrl: './products.component.html',
  styleUrl: './products.component.css',
})
export class ProductsComponent implements OnInit {
  originalProducts: Item[] = [];
  products?: Item[];
  isProductSelected = false;
  selectedProduct?: Item[];
  keyword: string | undefined = '';
  // products: Item[] = [];

  constructor(private productService: ProductService, private router: Router) {}

  ngOnInit(): void {
    this.productService.getProducts().subscribe({
      next: (response) => {
        this.originalProducts = response; // save unfiltered products
        this.products = response;
      },
    });
  }

  onSearch(keyword: string) {
    if (keyword !== '') {
      this.products = this.originalProducts?.filter((product) => {
        return (
          product.productName.toLowerCase().includes(keyword.toLowerCase()) ||
          product.productDescription
            .toLowerCase()
            .includes(keyword.toLowerCase())
        );
      });
    } else {
      this.products = this.originalProducts;
    }
  }

  onCancelTask() {
    this.router.navigate(['/']);
  }

  // onCloseNewProduct(event: string) {
  //   this.closeAddProduct.emit(event);
  // }

  // get selectedProduct() {
  //   return this.products?.find(
  //     (product) => product.productId === this.selectedProductId
  //   );
  // }

  onDeleteProduct(productId: string) {
    this.productService.onDeleteProduct(productId);
    this.onCancelTask();
    this.products = this.products?.filter(
      (product) => product.productId !== productId
    );
  }
}
