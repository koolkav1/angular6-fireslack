import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { NgForm } from '@angular/forms';
import { NotifierService } from 'angular-notifier';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  private readonly notifier: NotifierService;
  constructor(private authService: AuthService,
    private notifierService: NotifierService,
    private router: Router) {
      this.notifier = this.notifierService;
     }
  onSubmit(form: NgForm){
    const email = form.value.email;
    console.log(email);
    const password = form.value.password;
    console.log(password)
    this.authService.loginUser(email,password)
    .then(()=> {
      this.notifier.notify('success', 'Login is successful');
          this.router.navigate(['chatroom/channels']);
          form.reset();
    })
    .catch(err => {
      this.notifier.notify('error', 'Unsuccessful login');
      console.log(err);
    });
   
  }
  ngOnInit() {
  }

}
