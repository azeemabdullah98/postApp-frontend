import { Component, Input } from '@angular/core';
import { Product } from '../../product/product.model';

@Component({
  selector: 'app-favourite',
  imports: [],
  templateUrl: './favourite.component.html',
  styleUrl: './favourite.component.css',
})
export class FavouriteComponent {
  @Input({ required: true }) favouriteProduct!: Product;
}
