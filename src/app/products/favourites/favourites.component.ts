import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FavouriteComponent } from './favourite/favourite.component';
import { dummyProducts } from '../dummy-products';

@Component({
  selector: 'app-favourites',
  imports: [FavouriteComponent],
  templateUrl: './favourites.component.html',
  styleUrl: './favourites.component.css',
})
export class FavouritesComponent {
  @Input({ required: true }) authType!: string;
  @Output() closeFavourites = new EventEmitter<void>();
  productData = dummyProducts;

  onCloseFavourites() {
    this.closeFavourites.emit();
  }
}
