import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class UserProductsService {
  private baseUrl = 'http://localhost:8888';
  private currentUserProduct: any[] = [];

  constructor(private http: HttpClient) {}

  addUserProduct(userId: number, productId: string) {
    const userProduct = new HttpParams()
      .set('userId', userId)
      .set('productId', productId);
    return this.http.post(`${this.baseUrl}/userproducts/userproduct`, {
      userProduct,
    });
  }

  getUserProducts(userId: number) {
    return this.http.get(
      `${this.baseUrl}/userproducts/userproduct?userId=${userId}`
    );
  }

  setUserProduct(userProducts: any[]) {
    this.currentUserProduct = userProducts;
  }

  getUserProduct() {
    return this.currentUserProduct;
  }
}
