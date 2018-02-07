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
  active: boolean = false;
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

  // get election info from server
  loadElection(){

    // get id from route
    this.route.params.subscribe(params => {
      this.electionId = params['id'];
    });

    // get election info from server
    var headers = new Headers();
    this.http.get(this.urlBase + '/get/election/' + this.electionId, {headers:headers})
      .subscribe(
        (res) => {
          if(res.status == 200){
            this.election = JSON.parse(res['_body']);
            this.setStatus();
          }
        },
        (err) => {
          
      });
  }

  // determin is the election is currently running
  isActive(){
    let beginDate = Date.parse(this.election.dateRange.beginJsDate);
    let now: any = new Date();

    if((beginDate - Date.parse(now)) < 0){
      this.active = true;
    } else {
      this.active = false;
    }
  }

  // kind of a mock status, mostly for the ui
  setStatus(){
    this.isActive();
    if(!this.election.ballot){
      this.status = 'Needs a Ballot'
    } else if(this.active) {
      this.status = 'Active'
    }
  }

  ngOnInit() {

    this.loadElection();

  }

}
