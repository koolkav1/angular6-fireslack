import { Component, OnInit, OnDestroy } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { ChannelService } from '../../../services/channel.service';
import { Router } from '@angular/router';
import { MessageService } from '../../../services/message.service';
import { AuthService } from '../../../services/auth.service';
import { UserService } from '../../../services/user.service';
import { Subscription } from 'rxjs';
import { User } from '../../../models/user.model';

@Component({
  selector: 'app-channels',
  templateUrl: './channels.component.html',
  styleUrls: ['./channels.component.css']
})
export class ChannelsComponent implements OnInit {
channels: any[];
data: any[];
users: any;
authId: string; // Its the ID of the current logged in user
selectedIndex: number;
selectedIndexUser: number;
private subscription: Subscription;
  constructor(
    private db: AngularFireDatabase,
    private messageService: MessageService,
    private authService: AuthService,
    private userService: UserService
  ) { }

 


  ngOnInit() {
    this.displayData();
    this.getUsers();
   this.subscription = this.authService.afAuth.authState.subscribe(auth => {
      this.authId = auth.uid;
      console.log(`Subscribed Auth Uid ${this.authId}`);
      
    });
  }
  newMessage(channelId: any){
    this.messageService.changeMessage(channelId);
  }
  sendUser2Id(user2Id: any){
    this.messageService.getUser2Id(user2Id);
  }
  public displayData() {
    this.db.list('/channels').valueChanges().subscribe(data => {
      this.channels = data;
      console.log(data)
    });
  }
  public getUsers() {
    this.userService.getAllUsers().subscribe(users => {
      this.users = users;
      console.log(this.users[0].displayName);
    });
  }
  logoutUser(){
    this.authService.logout();
  }
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
