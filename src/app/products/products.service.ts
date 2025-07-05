import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Item } from './product/item.model';
import { Product } from './product/product.model';

@Injectable({ providedIn: 'root' })
export class ProductService {
  private baseUrl = 'http://localhost:8888';

  constructor(private http: HttpClient) {}

  getProducts() {
    return this.http.get<Item[]>(`${this.baseUrl}/products/product`);
  }

  getImageUrl(filename: string): string {
    return `${this.baseUrl}/products/image/${filename}`;
  }

  addProducts(product: FormData) {
    return this.http.post(`${this.baseUrl}/products/product`, product);
  }
}
