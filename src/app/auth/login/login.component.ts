import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  @Input({ required: true }) authType!: string;
  @Output() closeLogin = new EventEmitter<void>();
  @Output() onLoginSuccess = new EventEmitter<any>();
  user = { username: '', password: '' };
  // enteredUsername = '';
  // enteredPassword = '';
  error = '';

  constructor(private authService: AuthService, private router: Router) {}

  onLogin() {
    if (this.user.username === '' || this.user.password === '') {
      this.error = 'Please provide Username/Password';
      return;
    }

    this.authService.login(this.user).subscribe({
      next: (user: any) => {
        console.log('User logged in:', user);
        this.authService.setUser(user);
        if (user.user_roles.includes('ROLE_ADMIN')) {
          this.router.navigate(['/']);
        }
        this.closeLogin.emit();
        this.onLoginSuccess.emit(user);
      },
      error: (error) => {
        this.error = error.error.message;
      },
    });
  }
  onCloseLogin() {
    this.closeLogin.emit();
  }
}
