import { Component, Input, Output, EventEmitter } from '@angular/core';
import { type Product } from '../product/product.model';
import { Item } from '../product/item.model';

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

  onCloseTask() {
    this.closeTask.emit();
  }

  // onSelectFavourite() {
  //   this.product!.isLiked = !this.product!.isLiked;
  //   console.log(this.product?.isLiked);
  // }

  get imagePath() {
    return this.product?.imagePath;
  }
}
