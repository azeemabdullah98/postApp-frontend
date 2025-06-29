import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Item } from './product/item.model';

@Injectable({ providedIn: 'root' })
export class ProductService {
  private baseUrl = 'http://localhost:8888';

  constructor(private http: HttpClient) {}

  getProducts() {
    return this.http.get<Item[]>(`${this.baseUrl}/products/product`);
  }

  getImageUrl(imagePath: string): string {
    return `${this.baseUrl}/products/image/${imagePath}`;
  }
}
