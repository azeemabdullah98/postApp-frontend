import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FavouriteComponent } from './favourite/favourite.component';
import { Item } from '../product/item.model';

@Component({
  selector: 'app-favourites',
  imports: [FavouriteComponent],
  templateUrl: './favourites.component.html',
  styleUrl: './favourites.component.css',
})
export class FavouritesComponent {
  @Input({ required: true }) authType!: string;
  @Output() closeFavourites = new EventEmitter<string>();
  productData: Item[] = [];
  isProductSelected = false;
  selectedProductId?: string;

  onCloseFavourites() {
    this.closeFavourites.emit('Favourites');
  }

  onShowProductDetail(productId: string) {
    this.isProductSelected = !this.isProductSelected;
    this.selectedProductId = productId;
  }

  onCancelTask() {
    this.isProductSelected = !this.isProductSelected;
  }

  get selectedProduct() {
    return this.productData.find(
      (product) => product.productId === this.selectedProductId
    );
  }
}
