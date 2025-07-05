import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Role } from './role.model';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private baseUrl = 'http://localhost:8888';
  private currentUser: any = null;

  constructor(private http: HttpClient) {}

  signup(user: any) {
    return this.http.post(`${this.baseUrl}/register`, user);
  }

  login(user: any) {
    return this.http.post(`${this.baseUrl}/login`, user);
  }

  update(user: any) {
    return this.http.post(`${this.baseUrl}/edituser`, user);
  }

  getRoles() {
    return this.http.get<Role[]>(`${this.baseUrl}/roles`);
  }

  //   delete(id: number) {
  //     return this.http.delete(`${this.baseUrl}/${id}`);
  //   }

  setUser(user: any) {
    this.currentUser = user;
  }

  getUser() {
    return this.currentUser;
  }
}
