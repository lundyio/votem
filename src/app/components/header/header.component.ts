import { Component, OnInit, Input } from '@angular/core';
import { AuthService } from '../../services/auth/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  @Input('parent') parent: string;
  showLoginButton: boolean = false;
  hover: boolean = false;

  constructor(private authService: AuthService) { }

  ngOnInit() {

    // only show login button on landing page
    if(this.parent === 'landing'){
      this.showLoginButton = true;
    } else {
      this.showLoginButton = false;
    }

  }

}
