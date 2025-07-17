import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Item } from '../product/item.model';
import { ProductService } from '../products.service';
import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'app-product-summary',
  imports: [CommonModule],
  templateUrl: './product-summary.component.html',
  styleUrl: './product-summary.component.css',
})
export class ProductSummaryComponent {
  @Input({ required: true }) product?: Item;
  @Output() closeTask = new EventEmitter<void>();
  @Output() deleteProduct = new EventEmitter<string>();
  showDeleteModal = false;

  constructor(
    private productService: ProductService,
    private authService: AuthService
  ) {}

  onCloseTask() {
    this.closeTask.emit();
  }

  get imagePath() {
    return this.product?.imagePath;
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
}
