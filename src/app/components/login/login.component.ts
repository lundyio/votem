import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  tooltip: boolean = false;
  invalid: boolean = false;

  constructor() { }

  onSubmit(f){
    if(f.invalid){
      this.invalid = true;
    } else if(f.value.username === 'admin' && f.value.password === 'password') {
      this.invalid = false;
    } else {
      this.invalid = false;
      window.setTimeout(() => { this.invalid = true; });
    }
  }

  ngOnInit() {

  }

}
