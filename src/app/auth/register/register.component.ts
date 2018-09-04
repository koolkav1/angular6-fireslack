import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { NotifierService } from 'angular-notifier';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  private readonly notifier: NotifierService;
  constructor(private authService: AuthService,
    private router: Router,
    private notifierService: NotifierService) {
      this.notifier = this.notifierService;
     }
  onRegister(form: NgForm){
    const displayName = form.value.displayName;
    const email = form.value.email;
    const password = form.value.password;
    this.authService.registerUser(email,password)
    .then(()=> {
      this.notifier.notify('success', 'you have successfully been registered');
          this.router.navigate(['editProfile']);
    })
    .catch(err => {
      this.notifier.notify('error', 'Registration was unsuccessful');
      console.log(err);
    })
    
 
  }
  ngOnInit() {
  }

}
