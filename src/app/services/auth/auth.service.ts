import { Injectable } from '@angular/core';
import { Router } from '@angular/router';


@Injectable()
export class AuthService {

  constructor(private router: Router) { }

  startSession(){
    localStorage.setItem('authenticated', 'true');
  }

  endSession(){
    localStorage.removeItem('authenticated');
  }

  logIn(){
    this.startSession();
    this.router.navigate(['/admin']);
  }

  logOut(){
    this.endSession();
    this.router.navigate(['/landing']);
  }

}
