import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms'
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { environment } from '../../../environments/environment';
import { Router } from '@angular/router';
import {IMyDrpOptions} from 'mydaterangepicker';

@Component({
  selector: 'app-new-election',
  templateUrl: './new-election.component.html',
  styleUrls: ['./new-election.component.scss']
})
export class NewElectionComponent implements OnInit {

  submitted: boolean = false;
  urlBase: string = environment.apiUrl;
  error: boolean = false;
  errorMessage: string;

  dateRangeOptions: IMyDrpOptions = {
    inline: true,
    dateFormat: 'mm.dd.yyyy',
  };

  constructor(private http: Http, private router: Router) { }

  onSubmit(f){
    this.submitted = false;
    window.setTimeout(()=>{this.submitted = true;});
    console.log(f);

    if(f.valid){
      var headers = new Headers();
      this.http.post(this.urlBase + '/save/election', f.value,{headers:headers})
        .subscribe(
          (res) => {
            if(res.status == 200){
              this.router.navigate(['admin']);
            }
          },
          (err) => {
            console.log(err._body);
            this.error = true;
            if(err._body === 'Election Code'){
              this.errorMessage = 'This election code has already been used.'
            } else if(err._body === 'Election Name') {
              this.errorMessage = 'This election name has already been used.'
            } else {
              this.errorMessage = 'There was an issue creating you election please contact the administrator if the issue persists.'
            }
        });
    }

  }

  ngOnInit() {  

  }

}
