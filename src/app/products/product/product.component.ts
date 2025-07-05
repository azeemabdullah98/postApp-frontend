import { Component, Input, Output, EventEmitter } from '@angular/core';
import { type Product } from './product.model'; // Adjust the import path as necessary
import { Item } from './item.model';
import { ProductService } from '../products.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrl: './product.component.css',
})
export class ProductComponent {
  @Input() product!: Item;
  @Output() select = new EventEmitter<string>();

  constructor(private productService: ProductService) {}
  onSelectProduct() {
    this.select.emit(this.product.productId);
  }

  getImageUrl(filename: string): string {
    // console.log(this.productService.getImageUrl(filename));
    return this.productService.getImageUrl(filename);
  }
}
