import { Component } from '@angular/core';

import updateUser from '../api/user/update';

interface Choice {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-update-user',
  templateUrl: './update-user.component.html',
  styleUrls: ['./update-user.component.css'],
})
export class UpdateUserComponent {
  choice: Choice[] = [
    { value: 'username', viewValue: 'Username' },
    { value: 'password', viewValue: 'Password' },
    { value: 'class', viewValue: 'Class' },
  ];

  public inputData = '';

  setInput(value: string) {
    this.inputData = value;
  }

  async updateUserInfo() {
    let res = await updateUser(this.choice.toString(), this.inputData);
    console.log(res);
    alert('User has been ipdate');
  }
}
