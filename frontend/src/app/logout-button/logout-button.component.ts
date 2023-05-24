import { Component } from '@angular/core';
import Logout from '../api/user/logout';

@Component({
  selector: 'app-logout-button',
  templateUrl: './logout-button.component.html',
  styleUrls: ['./logout-button.component.css'],
})
export class LogoutButtonComponent {
  logoutFunction() {
    Logout();
    alert('You are logged out');
  }
}
