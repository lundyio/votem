import { Component, OnInit } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { environment } from '../../../environments/environment';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-election-details',
  templateUrl: './election-details.component.html',
  styleUrls: ['./election-details.component.scss']
})
export class ElectionDetailsComponent implements OnInit {

  urlBase: string = environment.apiUrl;
  electionId: string;
  status: string = 'Checking...'
  election: any = {
    name: '',
    ballot: '',
    created: '',
    dateRange: {
      beginJsRange: '',
      endJsRange: ''
    }
  };

  constructor(private http: Http, private router: Router, private route: ActivatedRoute) { }

  loadElection(){

    this.route.params.subscribe(params => {
      this.electionId = params['id'];
    });

    var headers = new Headers();
    this.http.get(this.urlBase + '/get/election/' + this.electionId, {headers:headers})
      .subscribe(
        (res) => {
          if(res.status == 200){
            this.election = JSON.parse(res['_body']);
            this.setStatus();
            console.log(this.election);
          }
        },
        (err) => {
          
      });
  }

  setStatus(){
    if(!this.election.ballot){
      this.status = 'Needs a Ballot'
    }
  }

  ngOnInit() {

    this.loadElection();

  }

}
