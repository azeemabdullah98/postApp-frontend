import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Item } from '../product/item.model';
import { ProductService } from '../products.service';
import { AuthService } from '../../auth/auth.service';
import { UserProductsService } from '../favourites/user-products.service';

@Component({
  selector: 'app-product-summary',
  imports: [CommonModule],
  templateUrl: './product-summary.component.html',
  styleUrl: './product-summary.component.css',
})
export class ProductSummaryComponent implements OnInit {
  @Input({ required: true }) product?: Item;
  @Output() closeTask = new EventEmitter<void>();
  @Output() deleteProduct = new EventEmitter<string>();
  showDeleteModal = false;
  favourites = false;
  // userProducts: any;

  constructor(
    private productService: ProductService,
    private authService: AuthService,
    private userProductsService: UserProductsService
  ) {}

  ngOnInit(): void {
    if (localStorage.getItem('userProductData')) {
      this.userProductsService.setUserProduct(
        JSON.parse(localStorage.getItem('userProductData')!)
      );
    }
    this.getFavourites();
    // console.log('favourites', this.favourites);
    // console.log(this.userProductsService.getUserProduct());
  }

  onCloseTask() {
    this.closeTask.emit();
  }

  get imagePath() {
    return this.product?.imagePath;
  }

  getFavourites() {
    // console.log('user porduct is ', this.userProducts);
    this.favourites = this.userProductsService
      .getUserProduct()
      .some(
        (userProduct) => userProduct.id.productId === this.product?.productId
      );
  }

  getImageUrl(filename: string): string {
    // console.log(this.productService.getImageUrl(filename));
    return this.productService.getImageUrl(filename);
  }

  onDeleteProduct() {
    this.deleteProduct.emit(this.product!.productId);
  }

  openDeleteModal(product: Item) {
    this.product = product;
    this.showDeleteModal = true;
  }

  closeDeleteModal() {
    this.showDeleteModal = false;
  }

  get currentUser() {
    return this.authService.getUser();
  }

  onSelectFavourite() {
    // console.log(this.favourites);
    this.favourites === true
      ? this.userProductsService
          .removeUserProduct(this.currentUser.id, this.product!.productId)
          .subscribe({
            complete: () => {
              this.updateLocalStorage();
            },
            next: (response) => {
              console.log('Product removed from favourites:', response);
              alert('Product removed from favourites');
            },
            error: (error) => {
              console.error('Error removing product from favourites:', error);
              alert('Error removing product from favourites');
            },
          })
      : this.userProductsService
          .addUserProduct(this.currentUser.id, this.product!.productId)
          .subscribe({
            next: (response) => {
              console.log('Product added to favourites:', response);
              alert('Product added to favourites');
            },
            error: (error) => {
              console.error('Error adding product to favourites:', error);
              alert('Error adding product to favourites');
            },
            complete: () => {
              this.updateLocalStorage();
            },
          });
    this.favourites = !this.favourites;
  }

  updateLocalStorage() {
    localStorage.removeItem('userProductData');
    this.userProductsService.getUserProducts(this.currentUser.id).subscribe({
      complete: () => {
        localStorage.setItem(
          'userProductData',
          JSON.stringify(this.userProductsService.getUserProduct())
        );
      },
      error: () => {},
      next: (res: any) => {
        this.userProductsService.setUserProduct(res);
      },
    });
  }
}
