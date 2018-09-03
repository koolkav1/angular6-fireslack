import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { UserService } from '../services/user.service';
import { NgForm } from '@angular/forms';
import { NotifierService } from 'angular-notifier';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
 displayName: string;
 private readonly notifier: NotifierService;
  constructor(
    private userService: UserService,
    private notifierService: NotifierService) { 
      this.notifier = this.notifierService;
    }

  ngOnInit() {  
  }
  updateUser(form: NgForm){
   this.displayName = form.value.displayName;
   this.userService.updateUserDisplayName(this.displayName);
   this.notifier.notify('success', 'You have successfully changed your Display Name');
   
  }

}
