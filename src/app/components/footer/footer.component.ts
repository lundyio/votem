import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {

  sticky: boolean = false;
  appRoot: any;

  constructor() { }

  ngOnInit() {

    this.appRoot = document.getElementsByTagName('app-root')[0];

    if( this.appRoot.offsetHeight > window.innerHeight){
      this.sticky = false;
    } else {
      this.sticky = true;
    }

  }

}
