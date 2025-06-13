import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-signup',
  imports: [FormsModule],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css',
})
export class SignupComponent {
  @Input({ required: true }) authType!: string;
  @Output() closeSignup = new EventEmitter<void>();
  enteredEmail = '';
  enteredPassword = '';
  enteredUsername = '';
  onSubmitTask() {
    throw new Error('Method not implemented.');
  }
  onCloseSignup() {
    this.closeSignup.emit();
  }
}
