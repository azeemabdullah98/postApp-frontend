import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Product } from '../product/product.model';
import { dummyProducts } from '../dummy-products';

@Component({
  selector: 'app-product-summary',
  imports: [],
  templateUrl: './product-summary.component.html',
  styleUrl: './product-summary.component.css',
})
export class ProductSummaryComponent {
  @Input({ required: true }) product?: Product;
  @Output() closeTask = new EventEmitter<void>();

  onCloseTask() {
    this.closeTask.emit();
  }

  onSelectFavourite() {
    this.product!.isLiked = !this.product!.isLiked;
    console.log(this.product?.isLiked);
  }
}
