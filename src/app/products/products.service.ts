import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Item } from './product/item.model';
import { Product } from './product/product.model';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ProductService {
  private baseUrl = 'http://localhost:8888';
  selectedFile!: File;
  imagePreview!: string | ArrayBuffer | null;

  constructor(private http: HttpClient) {}

  getProducts() {
    return this.http.get<Item[]>(`${this.baseUrl}/products/product`);
  }

  getProductById(productId: string) {
    return this.http.get(`${this.baseUrl}/products/product`, {
      params: { productId },
    });
  }

  getImageUrl(filename: string | undefined): string {
    return `${this.baseUrl}/products/image/${filename}`;
  }

  addProducts(product: FormData) {
    return this.http.post(`${this.baseUrl}/products/product`, product);
  }

  deleteProduct(productId: string) {
    return this.http.delete(`${this.baseUrl}/products/product/${productId}`);
  }

  onDeleteProduct(productId: string) {
    this.deleteProduct(productId).subscribe({
      next: (response: any) => {
        alert(response.message);
      },
      error: (error) => {
        alert(error.error.message);
      },
    });
  }

  searchProducts(keyword: string): Observable<Item[]> {
    return this.http.get<Item[]>(
      `${this.baseUrl}/products/search?keyword=${keyword}`
    );
  }
}
