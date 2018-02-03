import { Component, OnInit } from '@angular/core';
import {HttpClientModule, HttpClient} from '@angular/common/http';
import { AuthService } from '../../services/auth/auth.service';
import { CanActivate, Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  tooltip: boolean = false;
  invalid: boolean = false;

  constructor(private authService: AuthService, private router: Router) { }

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

    if(this.authService.isLoggedIn()){
      this.router.navigate(['/admin']);
    }

  }

}
