import { Component, OnInit } from '@angular/core';

import { AuthService } from '../../services/auth.service';
import { MessageService } from '../../services/message.service';
import { AngularFireDatabase } from 'angularfire2/database';
import { ActivatedRoute } from '@angular/router';
import { Message } from '../../models/message.model';
import { User } from '../../models/user.model';

@Component({
  selector: 'app-direct-message',
  templateUrl: './direct-message.component.html',
  styleUrls: ['./direct-message.component.css']
})
export class DirectMessageComponent implements OnInit {
message: string;
user2Id: any;
authId: any;
activeRouteUser1Id: any;
messageDisplayData: Message[];
receiverName: any;
receiverData: User;
  constructor(
    private authService: AuthService,
    private messageService: MessageService,
    private db: AngularFireDatabase,
    private activeRoute: ActivatedRoute
  ) { }


  ngOnInit() {
  }
  sendMessage() {
    this.messageService.storeDirectMessage(this.user2Id, this.message);
    this.message = '';
  }

  getDirectMessages(path: any){
    console.log(`Path::: ${path}`);
    this.db.list(path).valueChanges().subscribe((messageData: Message[]) => {
      this.messageDisplayData = messageData;
      console.log(`The messages are ${this.messageDisplayData[0].message}`);
    });

  }
  getMessageDatabasePath(user1Id: any, user2Id:any){
    let path = '';
    if(user1Id < user2Id){
      console.log('User2id is greater');
      path = `userMessages/${user2Id}/${user1Id}`;
      return path;
    } 
    else if(user1Id > user2Id){
      console.log('this.authstate.uid is greater');
      path = `userMessages/${user1Id}/${user2Id}`;
      return path;
    }
    else if (user1Id === user2Id){
      console.log('user1id and user2 id are equal');
      path = `userMessages/${user1Id}/${user2Id}`;
      return path;
    }
  }

  getReceiverUserName(receiverId: any){
    const path = `/users/${receiverId}`;
    this.db.object(path).valueChanges().subscribe((data: User) =>{
      this.receiverData = data;
      this.receiverName = this.receiverData.displayName;
      console.log(`The Receiver Name is ${this.receiverName}`);
    });
  }

}
