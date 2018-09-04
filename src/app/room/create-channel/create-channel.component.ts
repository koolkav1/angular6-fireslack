import { Component, OnInit } from '@angular/core';
import { ChannelService } from '../../services/channel.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-channel',
  templateUrl: './create-channel.component.html',
  styleUrls: ['./create-channel.component.css']
})
export class CreateChannelComponent implements OnInit {
channelName: string;
  constructor(private channelService: ChannelService, private router: Router) { }

  ngOnInit() {
  }
  updateChannel(){
    console.log(`Channel Name::: ${this.channelName}`);
    this.channelService.updateChannelName(this.channelName);
  }

}
