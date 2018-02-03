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

  constructor(private authService: AuthService) { }

  ngOnInit() {

    if(this.parent === 'login' || this.parent === 'admin'){
      this.showLoginButton = false;
    } else {
      this.showLoginButton = true;
    }

  }

}
