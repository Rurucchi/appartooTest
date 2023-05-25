import { Component } from '@angular/core';
import addFriend from '../api/friends/addFriend';
import getFriends from '../api/friends/getFriends';
import { FriendCardComponent } from '../friend-card/friend-card.component';
import { OnInit } from '@angular/core';

@Component({
  selector: 'app-friend-list',
  templateUrl: './friend-list.component.html',
  styleUrls: ['./friend-list.component.css'],
})
export class FriendListComponent implements OnInit {
  public username = '';
  public list: any;

  setUsername(value: string) {
    this.username = value;
  }

  async addFriendUser(username: string) {
    let res = await addFriend(username);
    console.log(res);
  }

  async getAllFriends() {
    let res = await getFriends();

    res.forEach((element: string) => {
      this.list.push(element);
      console.log(element);
    });
  }

  ngOnInit(): void {
    this.list = [];
    this.getAllFriends();
  }
}
