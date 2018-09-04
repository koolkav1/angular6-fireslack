import { Injectable, OnDestroy } from '@angular/core';
import { Observable, of, from } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { User } from '../models/user.model';
import { Router } from '@angular/router';
import { AngularFirestore, AngularFirestoreDocument } from 'angularfire2/firestore';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase } from 'angularfire2/database';

@Injectable({
  providedIn: 'root'
})
export class AuthService implements OnDestroy {
  public currentUser:Observable<User | null>;
  public currentUserSnapshot: User | null;
  
  constructor(
    private router: Router,
    private db: AngularFirestore,
    public afAuth: AngularFireAuth
  ) { 
    this.currentUser = this.afAuth.authState
    .pipe(
      switchMap(
        (user)=> {
          if(user){
            return this.db.doc<User>(`users/${user.uid}`).valueChanges();
          } else {
            return of(null);
          }
        }
      )
    );
    this.setCurrentUserSnapshot();

  }
  public signup (displayName: string, email: string, password: string){
    return from(
      this.afAuth.auth.createUserWithEmailAndPassword(email, password)
      .then( (user) => {
        const userRef: AngularFirestoreDocument<User> = this.db.doc(`users/${user.user.uid}`);
        const updatedUser: User = {
          uid: user.user.uid,
          email: user.user.email,
          displayName,
          status: 'online'
        };
        userRef.set(updatedUser);
        return true;
      })
      .catch((err) => false)
    );
  }
  public login(email: string, password: string) : Observable<boolean>{
    return from(
      this.afAuth.auth.signInWithEmailAndPassword(email, password)
      .then((user)=> {
        const userRef: AngularFirestoreDocument<User> = this.db.doc(`users/${user.user.uid}`);
        const userStatus = {
          status: 'online'
        }
        userRef.update(userStatus);
        return true;
      })
      .catch((err)=> {
        console.log(err)
        return false;})
    );
  }
  public logout() {
    const data = {
    status: 'offline'
    };
    this.db.doc(`users/${this.currentUser}`).update(data).then(()=> console.log('You have been Logged out'))
    .catch(error => console.log(error));
    this.afAuth.auth.signOut();
    this.router.navigate(['home']);
  }

  private setCurrentUserSnapshot() {
    this.currentUser.subscribe(user => {
      this.currentUserSnapshot = user;
    });
  }
  ngOnDestroy(){
    this.logout();
  }
}
