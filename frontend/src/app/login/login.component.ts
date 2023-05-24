import { Component } from '@angular/core';
import { Router } from '@angular/router';

//api
import login from '../api/user/login';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  constructor(private router: Router) {}

  public username = '';
  public password = '';

  setUsername(value: string) {
    this.username = value;
  }

  setPassword(value: string) {
    this.password = value;
  }

  async loginUser(username: string, password: string) {
    let request = await login(username, password);
    console.log(request);
    if (request) {
      alert('You are logged in');
      this.router.navigate(['/friends']);
    }
  }
}
