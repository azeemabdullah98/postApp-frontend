import { Component, Input, Output, EventEmitter } from '@angular/core';
import { type Product } from '../product/product.model';
import { Item } from '../product/item.model';
import { ProductService } from '../products.service';

@Component({
  selector: 'app-product-summary',
  imports: [],
  templateUrl: './product-summary.component.html',
  styleUrl: './product-summary.component.css',
})
export class ProductSummaryComponent {
  @Input({ required: true }) product?: Item;
  @Input({ required: true }) isLoggedIn?: boolean;
  @Output() closeTask = new EventEmitter<void>();
  @Output() deleteProduct = new EventEmitter<string>();

  constructor(private productService: ProductService) {}

  onCloseTask() {
    this.closeTask.emit();
  }

  get imagePath() {
    return this.product?.imagePath;
  }

  getImageUrl(filename: string): string {
    // console.log(this.productService.getImageUrl(filename));
    return this.productService.getImageUrl(filename);
  }

  onDeleteProduct() {
    this.deleteProduct.emit(this.product!.productId);
  }
}
