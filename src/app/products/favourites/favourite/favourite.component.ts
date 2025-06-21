import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Product } from '../../product/product.model';

@Component({
  selector: 'app-favourite',
  imports: [],
  templateUrl: './favourite.component.html',
  styleUrl: './favourite.component.css',
})
export class FavouriteComponent {
  @Input({ required: true }) favouriteProduct!: Product;
  @Output() showProductDetails = new EventEmitter<number>();

  onRemoveFavourite() {
    this.favouriteProduct.isLiked = false;
  }

  onProductClick() {
    this.showProductDetails.emit(this.favouriteProduct.id);
  }
}
