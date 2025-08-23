import { Component, Input, Output, EventEmitter } from '@angular/core';
import { type Product } from './product.model'; // Adjust the import path as necessary
import { Item } from './item.model';
import { ProductService } from '../products.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrl: './product.component.css',
})
export class ProductComponent {
  @Input() product?: Item;
  // @Output() select = new EventEmitter<string>();

  constructor(private productService: ProductService, private router: Router) {}
  onSelectProduct() {
    if (this.product?.productId) {
      this.router.navigate(['/products', this.product.productId]);
    }
    // this.select.emit(this.product.productId);
  }

  getImageUrl(filename: string | undefined): string {
    return this.productService.getImageUrl(filename);
  }
}
