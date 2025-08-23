import { Component } from '@angular/core';
import { FavouriteComponent } from './favourite/favourite.component';
import { Item } from '../product/item.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-favourites',
  imports: [FavouriteComponent],
  templateUrl: './favourites.component.html',
  styleUrl: './favourites.component.css',
})
export class FavouritesComponent {
  productData: any;
  isProductSelected = false;
  selectedProductId?: string;

  constructor(private router: Router) {}

  ngOnInit() {
    const userProductData = JSON.parse(
      localStorage.getItem('userProductData')!
    );
    if (userProductData) {
      this.productData = userProductData;
    }
  }

  onCloseFavourites() {
    this.router.navigateByUrl('/');
  }

  onShowProductDetail(productId: string) {
    this.isProductSelected = !this.isProductSelected;
    this.selectedProductId = productId;
  }

  onCancelTask() {
    this.isProductSelected = !this.isProductSelected;
  }

  // get selectedProduct() {
  //   return this.productData.find(
  //     (product: any) => product?.id?.productId === this.selectedProductId
  //   );
  // }
}
