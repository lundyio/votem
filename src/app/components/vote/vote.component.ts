import { Component, OnInit } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { environment } from '../../../environments/environment';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-vote',
  templateUrl: './vote.component.html',
  styleUrls: ['./vote.component.scss']
})
export class VoteComponent implements OnInit {

  electionId: string;
  urlBase: string = environment.apiUrl;
  election: any = {
    ballot: []
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
            console.log(this.election);
          }
        },
        (err) => {
          
      });
  }

  ngOnInit() {
    this.loadElection();
  }

}
