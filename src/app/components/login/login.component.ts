import { Component, OnInit } from '@angular/core';
import {HttpClientModule, HttpClient} from '@angular/common/http';
import { AuthService } from '../../services/auth/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  tooltip: boolean = false;
  invalid: boolean = false;

  constructor(private authService: AuthService) { }

  onSubmit(f){
    if(f.invalid){
      this.invalid = true;
    } else if(f.value.username === 'admin' && f.value.password === 'password') {
      this.invalid = false;
      this.authService.logIn();
    } else {
      this.invalid = false;
      window.setTimeout(() => { this.invalid = true; });
    }
  }

  ngOnInit() {

  }

}
