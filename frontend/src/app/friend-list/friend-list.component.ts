import { Component } from '@angular/core';
import addFriend from '../api/friends/addFriend';
import getFriends from '../api/friends/getFriends';
import { FriendCardComponent } from '../friend-card/friend-card.component';
import { Directive, ViewContainerRef } from '@angular/core';

@Component({
  selector: 'app-friend-list',
  templateUrl: './friend-list.component.html',
  styleUrls: ['./friend-list.component.css'],
})
export class FriendListComponent {
  constructor(public viewContainerRef: ViewContainerRef) {}

  public username = '';

  setUsername(value: string) {
    this.username = value;
  }

  async addFriendUser(username: string) {
    let res = await addFriend(username);
    console.log(res);
  }
}

(async function getAllFriends() {
  let res = await getFriends();
  res.forEach((element: string) => {
    console.log(element);

    // this doesn't work, need to find a way to add component dynamicly since vanilla js api seems to be blocked
    const node = document.createElement('li');
    const textnode = document.createTextNode(element);
    document.getElementById('friendList')?.appendChild(node);
  });
})();
