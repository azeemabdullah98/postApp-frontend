import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { Role } from '../role.model';

@Component({
  selector: 'app-signup',
  imports: [FormsModule],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css',
})
export class SignupComponent {
  @Input({ required: true }) authType!: string;
  @Output() closeSignup = new EventEmitter<void>();
  user = {
    username: '',
    email: '',
    password: '',
    userRoles: [],
    active: true,
  };
  confirmPassword = '';
  message = '';
  error = '';
  roles: Role[] = [];

  constructor(private authService: AuthService, private router: Router) {
    this.authService.getRoles().subscribe({
      next: (response) => {
        this.roles = response;
      },
      error: (err) => {
        console.error('error fetching roles', err);
      },
    });
  }

  onCloseSignup() {
    this.closeSignup.emit();
  }

  signup() {
    if (this.user.password !== this.confirmPassword) {
      this.error = 'Confirm password do not match the password';
      return;
    }

    this.authService.signup(this.user).subscribe({
      next: (response: any) => {
        this.message = response.message;
        this.user.username = '';
        this.user.email = '';
        this.user.password = '';
        this.confirmPassword = '';
        this.user.userRoles = [];
      },
      error: (response) =>
        (this.error =
          response.error === null
            ? 'Please provide valid username/email'
            : response.error.message),
    });
  }

  // signup() {
  //   this.authService.signup(this.user).subscribe({
  //     next: (response: any) => {
  //       console.log(response);
  //     },
  //     error: (error) => console.log(error.error),
  //   });
  // }
}
