import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Product } from './product.model'; // Adjust the import path as necessary
import { dummyProducts } from '../dummy-products';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrl: './product.component.css',
})
export class ProductComponent {
  @Input() product!: Product;
  @Output() select = new EventEmitter<number>();

  onSelectProduct() {
    this.select.emit(this.product.id);
  }
}
