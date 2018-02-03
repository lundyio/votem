import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms'
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-new-election',
  templateUrl: './new-election.component.html',
  styleUrls: ['./new-election.component.scss']
})
export class NewElectionComponent implements OnInit {

  submitted: boolean = false;
  urlBase: string = environment.apiUrl;
  error: boolean = false;

  constructor(private http: Http) { }

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
              console.log(res);
            } else {
              this.error = true;
            }
          },
          (err) => {
            
        });
    }

  }

  ngOnInit() {  

  }

}
