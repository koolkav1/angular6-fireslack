import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase } from 'angularfire2/database';
import { Router } from '@angular/router';
import { AngularFirestore } from 'angularfire2/firestore';
import { auth } from 'firebase';

@Injectable({
  providedIn: 'root'
})
export class ChannelService {

  constructor(private afAuth: AngularFireAuth, private db: AngularFireDatabase, private router: Router,
  ) { }

  updateChannelName(channelName: string) {
    this.afAuth.authState.subscribe( ()=> {
      const newPostKey = this.db.database.ref().child('channels').push().key;
      const path = `/channels/${newPostKey}`;
      const channelData = {
        channelId: newPostKey,
        name: channelName
      };
        
      this.db.object(path).update(channelData)
      .then(() => console.log('Channel Stored'))
      .catch((err) => console.log(`Error occured ${err}`));
      }
    );
  }

  getChannels() {
    return this.db.list('/channels');
  }
}
