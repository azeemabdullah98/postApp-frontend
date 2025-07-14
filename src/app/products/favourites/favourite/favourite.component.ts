import { Component, Input, Output, EventEmitter } from '@angular/core';
import { type Product } from '../../product/product.model';
import { Item } from '../../product/item.model';

@Component({
  selector: 'app-favourite',
  imports: [],
  templateUrl: './favourite.component.html',
  styleUrl: './favourite.component.css',
})
export class FavouriteComponent {
  @Input({ required: true }) favouriteProduct!: Item;
  @Output() showProductDetails = new EventEmitter<string>();

  // onRemoveFavourite() {
  //   this.favouriteProduct.isLiked = false;
  // }

  onProductClick() {
    this.showProductDetails.emit(this.favouriteProduct.productId);
  }
}
