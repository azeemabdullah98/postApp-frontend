import { Component, Input, EventEmitter, Output, OnInit } from '@angular/core';
import { ProductComponent } from './product/product.component';
import { ProductSummaryComponent } from './product-summary/product-summary.component';
import { ProductService } from './products.service';
import { Item } from './product/item.model';
import { NewProductComponent } from './new-product/new-product.component';
import { UserProductsService } from './favourites/user-products.service';
import { AuthService } from '../auth/auth.service';

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
  selectedProductId?: string;
  // products: Item[] = [];

  constructor(
    private authService: AuthService,
    private productService: ProductService,
    private userProductsService: UserProductsService
  ) {}

  ngOnInit(): void {
    this.productService.getProducts().subscribe({
      next: (response) => {
        this.products = response;
        // console.log(this.products);
      },
    });
  }

  onSelectProduct(id: string) {
    this.selectedProductId = id;
    this.isProductSelected = true;
  }

  onCancelTask() {
    this.isProductSelected = false;
  }

  onCloseNewProduct(event: string) {
    this.closeAddProduct.emit(event);
  }

  get selectedProduct() {
    return this.products?.find(
      (product) => product.productId === this.selectedProductId
    );
  }

  onDeleteProduct(productId: string) {
    this.productService.onDeleteProduct(productId);
    this.onCancelTask();
    this.products = this.products?.filter(
      (product) => product.productId !== productId
    );
  }
}
