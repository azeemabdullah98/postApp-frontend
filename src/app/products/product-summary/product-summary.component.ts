import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Item } from '../product/item.model';
import { ProductService } from '../products.service';
import { AuthService } from '../../auth/auth.service';
import { UserProductsService } from '../favourites/user-products.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-product-summary',
  imports: [CommonModule],
  templateUrl: './product-summary.component.html',
  styleUrl: './product-summary.component.css',
})
export class ProductSummaryComponent implements OnInit {
  // @Input({ required: true }) product?: any;
  product?: any | null;
  // @Output() deleteProduct = new EventEmitter<string>();
  showDeleteModal = false;
  favourites = false;
  // productId: string | null = null;
  isDataLoaded: boolean = false;

  constructor(
    private productService: ProductService,
    private authService: AuthService,
    private userProductsService: UserProductsService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      const id = params.get('id');
      if (id) {
        this.productService.getProductById(id).subscribe({
          next: (product) => {
            this.product = product;
            this.getFavourites();
          },
          error: (error) => {
            console.error('Error loading product:', error);
          },
        });
      }
    });

    if (localStorage.getItem('userProductData')) {
      this.userProductsService.setUserProduct(
        JSON.parse(localStorage.getItem('userProductData')!)
      );
    }

    this.getFavourites();
  }

  onCloseTask() {
    this.router.navigate(['/home']);
  }

  getFavourites() {
    this.favourites = this.userProductsService
      .getUserProduct()
      .some(
        (userProduct) => userProduct.id.productId === this.product[0]?.productId
      );
  }

  getImageUrl(filename: string | undefined): string {
    return this.productService.getImageUrl(filename);
  }

  onDeleteProduct() {
    // this.deleteProduct.emit(this.product!.productId);
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
    this.favourites === true
      ? this.userProductsService
          .removeUserProduct(this.currentUser.id, this.product[0]!.productId)
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
          .addUserProduct(this.currentUser.id, this.product[0]!.productId)
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
