import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  @Input('parent') parent: string;
  showLoginButton: boolean = false;

  constructor() { }

  ngOnInit() {

    if(this.parent === 'login'){
      this.showLoginButton = false;
    } else {
      this.showLoginButton = true;
    }

  }

}
