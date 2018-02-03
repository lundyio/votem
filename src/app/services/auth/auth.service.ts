import { Injectable } from '@angular/core';
import { Router } from '@angular/router';


@Injectable()
export class AuthService {

  constructor(private router: Router) { }

  startSession(){
    sessionStorage.setItem('authenticated', 'true');
  }

  endSession(){
    sessionStorage.removeItem('authenticated');
  }

  logIn(){
    this.startSession();
    this.router.navigate(['/admin']);
  }

  logOut(){
    this.endSession();
    this.router.navigate(['/landing']);
  }

  isLoggedIn(){
    if(sessionStorage.getItem('authenticated')){
      return true;
    } else {
      this.router.navigate(['/login']);
      return false;
    }
  }

}
