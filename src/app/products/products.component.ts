import { Component, Input, EventEmitter, Output, OnInit } from '@angular/core';
import { ProductComponent } from './product/product.component';
import { ProductSummaryComponent } from './product-summary/product-summary.component';
import { ProductService } from './products.service';
import { Item } from './product/item.model';
import { NewProductComponent } from './new-product/new-product.component';
import { UserProductsService } from './favourites/user-products.service';
import { AuthService } from '../auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-products',
  imports: [ProductComponent, ProductSummaryComponent, NewProductComponent],
  templateUrl: './products.component.html',
  styleUrl: './products.component.css',
})
export class ProductsComponent implements OnInit {
  @Input({ required: true }) isAddProduct!: boolean;
  @Input({ required: true }) products?: Item[];
  @Output() closeAddProduct = new EventEmitter<string>();
  isProductSelected = false;
  selectedProduct?: Item;
  // products: Item[] = [];

  constructor(
    private authService: AuthService,
    private productService: ProductService,
    private userProductsService: UserProductsService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.productService.getProducts().subscribe({
      next: (response) => {
        this.products = response;
        // console.log(this.products);
      },
    });
  }

  onSelectProduct(product: Item) {
    this.selectedProduct = product;
    this.isProductSelected = true;
    // this.router.navigate(['/products', product.productId]);
  }

  onCancelTask() {
    this.isProductSelected = false;
    this.router.navigate(['/']);
  }

  onCloseNewProduct(event: string) {
    this.closeAddProduct.emit(event);
  }

  // get selectedProduct() {
  //   return this.products?.find(
  //     (product) => product.productId === this.selectedProductId
  //   );
  // }

  onDeleteProduct(productId: string) {
    this.productService.onDeleteProduct(productId);
    this.onCancelTask();
    this.products = this.products?.filter(
      (product) => product.productId !== productId
    );
  }
}
