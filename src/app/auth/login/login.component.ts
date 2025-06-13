import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  imports: [FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  @Input({ required: true }) authType!: string;
  @Output() closeLogin = new EventEmitter<void>();
  enteredEmail = '';
  enteredPassword = '';
  onSubmitTask() {
    throw new Error('Method not implemented.');
  }
  onCloseLogin() {
    this.closeLogin.emit();
  }
}
