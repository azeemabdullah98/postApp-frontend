import { Component } from '@angular/core';
import { ProductComponent } from './product/product.component';
import { dummyProducts } from './dummy-products';
import { ProductSummaryComponent } from './product-summary/product-summary.component';
import { Product } from './product/product.model';

@Component({
  selector: 'app-products',
  imports: [ProductComponent, ProductSummaryComponent],
  templateUrl: './products.component.html',
  styleUrl: './products.component.css',
})
export class ProductsComponent {
  isProductSelected = false;
  selectedProductId?: number;
  products = dummyProducts;

  onSelectProduct(id: number) {
    this.selectedProductId = id;
    this.isProductSelected = true;
  }

  onCancelTask() {
    this.isProductSelected = false;
  }

  get selectedProduct() {
    return this.products.find(
      (product) => product.id === this.selectedProductId
    );
  }
}
