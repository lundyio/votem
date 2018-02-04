import { Component, OnInit, ElementRef } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {

  sticky: boolean = false;
  appRoot: any = this.el.nativeElement.parentNode;
  windowHeight: any = window.innerHeight;

  constructor(private el: ElementRef) { }

  ngOnInit() {

    if(this.appRoot.offsetHeight > this.windowHeight){
      this.sticky = false;
    } else {
      this.sticky = true;
    }

  }

}
