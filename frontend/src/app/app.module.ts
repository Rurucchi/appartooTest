import { Component, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { FriendListComponent } from './friend-list/friend-list.component';
import { UpdateUserComponent } from './update-user/update-user.component';
import { RouterModule } from '@angular/router';
import { MatInputModule } from '@angular/material/input';
import { MatDividerModule } from '@angular/material/divider';
import { MatButtonModule } from '@angular/material/button';
import { FriendCardComponent } from './friend-card/friend-card.component';
import { MatCardModule } from '@angular/material/card';
import { FormsModule } from '@angular/forms';
import { LogoutButtonComponent } from './logout-button/logout-button.component';
import { NgFor } from '@angular/common';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FriendsDisplayComponent } from './friends-display/friends-display.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    FriendListComponent,
    UpdateUserComponent,
    FriendCardComponent,
    LogoutButtonComponent,
    FriendsDisplayComponent,
  ],
  imports: [
    RouterModule.forRoot([
      { path: '', component: HomeComponent },
      { path: 'login', component: LoginComponent },
      { path: 'update', component: UpdateUserComponent },
      { path: 'friends', component: FriendListComponent },
    ]),
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatInputModule,
    MatDividerModule,
    MatButtonModule,
    MatSelectModule,
    MatCardModule,
    FormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
