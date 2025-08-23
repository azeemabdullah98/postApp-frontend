import { Component, Input, Output, EventEmitter, inject } from '@angular/core';
import { type Product } from '../../product/product.model';
import { Item } from '../../product/item.model';
import { ProductService } from '../../products.service';

@Component({
  selector: 'app-favourite',
  imports: [],
  templateUrl: './favourite.component.html',
  styleUrl: './favourite.component.css',
})
export class FavouriteComponent {
  @Input({ required: true }) favouriteProductId!: string;
  @Output() showProductDetails = new EventEmitter<string>();

  private productService = inject(ProductService);

  productData!: any;
  // onRemoveFavourite() {
  //   this.favouriteProduct.isLiked = false;
  // }

  ngOnInit() {
    this.productService.getProductById(this.favouriteProductId).subscribe({
      next: (res) => {
        this.productData = res;
      },
      error: (err) => {
        console.log(err);
      },
      complete: () => {
        // complete handler...
      },
    });
  }

  getImageUrl(filename: string | undefined): string {
    return this.productService.getImageUrl(filename);
  }

  onProductClick() {}
}
