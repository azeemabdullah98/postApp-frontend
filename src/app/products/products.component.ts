import { Component, Input, OnInit } from '@angular/core';
import { ProductComponent } from './product/product.component';
import { dummyProducts } from './dummy-products';
import { ProductSummaryComponent } from './product-summary/product-summary.component';
import { Product } from './product/product.model';
import { FavouritesComponent } from './favourites/favourites.component';
import { ProductService } from './products.service';
import { Item } from './product/item.model';

@Component({
  selector: 'app-products',
  imports: [ProductComponent, ProductSummaryComponent],
  templateUrl: './products.component.html',
  styleUrl: './products.component.css',
})
export class ProductsComponent implements OnInit {
  @Input({ required: true }) isLoggedIn!: boolean;
  isProductSelected = false;
  selectedProductId?: string;
  products: Item[] = [];
  auth = 'Favourites';

  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    this.productService.getProducts().subscribe({
      next: (response) => {
        this.products = response;
        console.log(this.products);
      },
    });
  }

  // getImageUrl(filename: string): string {
  //   return this.productService.getImageUrl(filename);
  // }

  onSelectProduct(id: string) {
    this.selectedProductId = id;
    this.isProductSelected = true;
  }

  onCancelTask() {
    this.isProductSelected = false;
  }

  get selectedProduct() {
    return this.products.find(
      (product) => product.productId === this.selectedProductId
    );
  }
}
