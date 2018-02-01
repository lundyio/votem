import { Component, OnInit } from '@angular/core';

import fontawesome from '@fortawesome/fontawesome';
import { faShieldCheck } from '@fortawesome/fontawesome-pro-solid';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss']
})
export class LandingComponent implements OnInit {

  constructor() { }

  ngOnInit() {

    fontawesome.icon(faShieldCheck);

  }

}
