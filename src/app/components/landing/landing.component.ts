import { Component, OnInit } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { environment } from '../../../environments/environment';

import fontawesome from '@fortawesome/fontawesome';
import { faShieldCheck } from '@fortawesome/fontawesome-pro-solid';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss']
})
export class LandingComponent implements OnInit {

  invalid: boolean = false;
  model: any;
  urlBase: string = environment.apiUrl;

  constructor(private http: Http) { }

  onSubmit(f){
    if(f.invalid){
      this.invalid = true;
    } else {
      this.invalid = false;
      var headers = new Headers();
      this.http.post(this.urlBase + '/lookup', f.value,{headers:headers})
        .subscribe(
          (res) => {
            if(res.status == 200){
              console.log(res);
            } else {
              this.invalid = true;
            }
          },
          (err) => {
            
        });

      console.log(f.value);
    }
  }

  ngOnInit() {

    fontawesome.icon(faShieldCheck);

  }

}
