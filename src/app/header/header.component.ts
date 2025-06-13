import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-header',
  imports: [],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent {
  @Output() auth = new EventEmitter<string>();
  isLoginSelected = true;
  authType = '';

  onSignup() {
    this.authType = 'Signup';
    this.auth.emit(this.authType);
  }

  onLogin() {
    this.authType = 'Login';
    this.auth.emit(this.authType);
  }

  onFavourite() {
    this.authType = 'Favourites';
    this.auth.emit(this.authType);
  }
}
