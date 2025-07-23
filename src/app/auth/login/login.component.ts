import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { UserProductsService } from '../../products/favourites/user-products.service';

@Component({
  selector: 'app-login',
  imports: [FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  @Input({ required: true }) authType!: string;
  @Output() closeLogin = new EventEmitter<string>();
  user = { username: '', password: '' };
  // enteredUsername = '';
  // enteredPassword = '';
  error = '';

  constructor(
    private authService: AuthService,
    private router: Router,
    private userProductsService: UserProductsService
  ) {}

  onLogin() {
    if (this.user.username === '' || this.user.password === '') {
      this.error = 'Please provide Username/Password';
      return;
    }

    this.authService.login(this.user).subscribe({
      next: (user: any) => {
        console.log('User logged in:', user);
        this.authService.setUser(user);
        this.getUserProducts(user.id);
        this.closeLogin.emit('Login');
      },
      error: (error) => {
        this.error = error.error.message;
      },
    });
  }
  onCloseLogin() {
    this.closeLogin.emit('Login');
  }

  getUserProducts(id: number) {
    this.userProductsService.getUserProducts(id).subscribe({
      next: (response: any) => {
        this.userProductsService.setUserProduct(response);
        localStorage.setItem('userProductData', JSON.stringify(response));
        console.log('User products:', response);
      },
    });
  }
}
