import { Component, OnInit } from '@angular/core';
import { MessageService } from '../../services/message.service';
import { AngularFireDatabase } from 'angularfire2/database';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.css']
})
export class MessageComponent implements OnInit {
  message: string;
  channelId: any;
  messages: any;
  channelData: any;
  chanelName: string;
  test: string;
  constructor(
    private messageService: MessageService,
    private db: AngularFireDatabase,
    private activeRoute: ActivatedRoute
  ) { }


  ngOnInit() {
    this.messageService.currentChannelId.subscribe(data => {
      console.log(`Behavior: ${this.channelId}`);
      if( data == undefined || data === '') {
        this.channelId = this.activeRoute.snapshot.params['cid'];
      } else {
        this.channelId = data;
      }
      this.getChannelName(this.channelId);
      this.getMessages(this.channelId);
    });
  }
  sendMessage() {
    console.log(`Message sent: ${this.message}`);
    this.channelId = this.activeRoute.snapshot.params['cid'];
    this.messageService.storeMessage(this.channelId, this.message);
    this.message = '';
    console.log(`ChannelId ${this.channelId}`);
  }

  getMessages(channelId: any){
    console.log(`From getMessages ${this.channelId}`);
    const path = `/${channelId}/channelMessages`;
    console.log(`from getM ${path}`);
    this.db.list(path).valueChanges().subscribe(data => {
      this.messages = data;
    });
  }

  getChannelName(channelId: string){
    console.log(`ChannelId being passed: ${channelId}`);
    const path = `/channels/${channelId}`;
    this.db.object(path).valueChanges()
    .subscribe(data => {
      this.channelData = data;
      this.chanelName = this.channelData.name;
      console.log(`::: ${this.chanelName}`);
    });
  }

}
