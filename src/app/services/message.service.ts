import { Injectable } from '@angular/core';
import { AngularFireList, AngularFireDatabase } from 'angularfire2/database';
import { Message } from '../models/message.model';
import { BehaviorSubject } from 'rxjs';
import { AngularFireAuth } from 'angularfire2/auth';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class MessageService {
authState: any;
userData: User | any;
channelId: string;
message: string;
messages: AngularFireList<Message[]>;


//The user of Behavior subject is to get data from Sibling to a Sibling
private channelIdSource = new BehaviorSubject<string>("");
currentChannelId =this.channelIdSource.asObservable();

private user2IdSource = new BehaviorSubject<string>("");
currentUser2Id = this.user2IdSource.asObservable();


  constructor(private afAuth: AngularFireAuth, private db: AngularFireDatabase,
  ) {
      this.afAuth.authState.subscribe( auth=> {
        if(auth !== undefined && auth !== null){
          this.authState = auth;
        }
      });
     }

  changeMessage(channelId: any){
    this.channelIdSource.next(channelId);
  }

  storeMessage(channelId: any, message: string){
    this.getUserData().subscribe( data => {
      this.userData = data;
      console.log(`data : ${this.userData.displayName}`);

      const newPostKey = this.db.database.ref().child('channelMessages').push().key;
      let path = `${channelId}/channelMessages/${newPostKey}`;

      const timeStamp: any = this.db.database['ServerValue']['TIMESTAMP'];
      console.log(timeStamp);
      let messageData: Message ={
        messageId: newPostKey,
        uid: this.authState.uid,
        userName: this.userData.displayName,
        message,
        timeSent: timeStamp
      };

      this.db.object(path).update(messageData)
      .then(()=> console.log('Message Sent'))
      .catch((err)=> console.log(`Error occured in sending message... ${err}`));
    });
  }
  private getUserData() {
    console.log(`UID === ${this.authState.uid}`);
    const path = `/users/${this.authState.uid}`;
    return this.db.object(path).valueChanges();
  }
  //Below are the fuctions representing the direct message working
  getUser2Id(user2Id: any){
    this.user2IdSource.next(user2Id);
  }
  storeDirectMessage(user2Id: any, message: string){
    this.afAuth.authState.subscribe(users => {
      const timeStamp: any = this.db.database['ServerValue']['TIMESTAMP'];
      let path: string = this.getPath(this.authState.uid, user2Id);
      console.log(`This is the path ${path}`);

      this.getUserData().subscribe( (data) => {
        this.userData = data;
        console.log(`This user display name ${this.userData.displayName}`);
        let messageData: Message = {
          messageId: '',
          uid: this.authState.uid,
          userName: this.userData.displayName,
          message,
          timeSent: timeStamp
        };
        this.db.object(path).update(messageData)
        .then(() => console.log('Direct Message Sent'))
        .catch((err) => console.log(`Error ${err}`));
        console.log(`Direct Message from a service ${message}`);
      });

      });

      
  }
  private getPath(user1Id: any, user2Id: any){
    const newPostKey = this.db.database.ref().child('userMessages').push().key;
    let path: string = '';
    if(user1Id < user2Id){
      console.log('User2ID is greater');
      path = `userMessages/${user2Id}/${user1Id}/${newPostKey}`;
      return path;
    }
    else if(user1Id > user2Id){
      console.log(`${this.authState.uid} (user1Id) is greater`);
      path = `userMessages/${user1Id}/${user2Id}/${newPostKey}`;
      return path
    }
    else if(user1Id === user2Id) {
      console.log('user1id is equal to user2Id');
      path = `userMessages/${user1Id}/${user2Id}/${newPostKey}`;
      return path;
    }
    else {
      console.log('Cannot getpath()');
    }
  }
}
