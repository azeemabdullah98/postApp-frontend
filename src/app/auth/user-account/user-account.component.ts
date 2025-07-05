import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Role } from '../role.model';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-user-account',
  imports: [FormsModule],
  templateUrl: './user-account.component.html',
  styleUrl: './user-account.component.css',
})
export class UserAccountComponent {
  @Input({ required: true }) authType!: string;
  @Output() closeUserAccount = new EventEmitter<void>();
  user = {
    username: '',
    email: '',
    userRoles: [] as String[],
  };
  roles: Role[] = [];
  userRole: String = '';
  constructor(private authService: AuthService) {}

  ngOnInit() {
    const userData = this.authService.getUser();
    this.user.username = userData.username;
    this.user.email = userData.email;
    this.user.userRoles = userData.user_roles;

    this.authService.getRoles().subscribe((role: Role[]) => {
      this.roles = role;
    });
  }

  onCloseAccountInfo() {
    this.user.email = '';
    this.user.username = '';
    this.user.userRoles = [];
    this.closeUserAccount.emit();
  }
  updateUser() {
    // console.log(this.user);
    this.userRole !== '' ? this.user.userRoles.push(this.userRole) : null;
    this.authService.update(this.user).subscribe({
      next: (response) => {
        this.authService.setUser(response);
        console.log(response);
        alert('User updated successfully');
      },
      error: (error) => {
        // console.log(error.error);
        alert(error.error);
      },
    });
  }

  isSelected(role: Role) {
    return this.user.userRoles.some((r) => r === role.roleName);
  }

  toggleRoleSelection(role: Role) {
    if (this.isSelected(role)) {
      this.user.userRoles = this.user.userRoles.filter(
        (r) => r !== role.roleName
      );
    } else {
      // this.user.userRoles.push(role.roleName);
      this.userRole = role.roleName;
    }
  }
}
