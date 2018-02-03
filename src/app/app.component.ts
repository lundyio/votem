import { Component, OnInit } from '@angular/core';

import fontawesome from '@fortawesome/fontawesome';
import {faShieldCheck} from '@fortawesome/fontawesome-pro-solid';
import {faSignOutAlt} from '@fortawesome/fontawesome-pro-regular';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  ngOnInit() {

    fontawesome.icon(faShieldCheck);
    fontawesome.icon(faSignOutAlt);

  }

}
