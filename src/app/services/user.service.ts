import { Injectable } from '@angular/core';
import { AngularFireList, AngularFireDatabase } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UserService {
userData: AngularFireList<any[]>;
public authState: any;

  constructor(private db: AngularFireDatabase,
    private afAuth: AngularFireAuth,
    private router: Router) {
      this.authState = this.afAuth.authState;
     }
  
  public getAllUsers() {
    return this.db.list('/users').valueChanges();
  }
  public updateUserDisplayName(dName: string): void {
    this.afAuth.authState.subscribe( auth => {
      if(auth) {
        this.authState = auth;
        console.log(`:::: ${this.authState.uid} ${this.authState.email}`);
        this.db.object(`/users/${this.authState.uid}`)
        .set({
          uid: this.authState.uid,
          email: this.authState.email,
          displayName: dName,
          status: 'online'
        })
        .then( ()=> this.router.navigate(['chatroom/channels']) )
        .catch( err => console.log(err));
      }
      else {
        console.log('User isnot logged in');
      }
    });
  }
}
