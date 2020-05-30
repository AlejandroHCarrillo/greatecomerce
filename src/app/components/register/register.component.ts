import { Component, OnInit } from '@angular/core';
import { AuthService } from 'shared/services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styles: [
  ]
})
export class RegisterComponent implements OnInit {
  registerForm: any;
  errorMessage: string;
  successMessage: string;

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
  }

  tryRegister(value){
    // this.authService.doRegister(value)
    // .then(res => {
    //   console.log(res);
    //   this.errorMessage = "";
    //   this.successMessage = "Your account has been created";
    // }, err => {
    //   console.log(err);
    //   this.errorMessage = err.message;
    //   this.successMessage = "";
    // });
  }

}
