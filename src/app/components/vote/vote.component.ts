import { Component, OnInit, ViewChild } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { environment } from '../../../environments/environment';
import { Router, ActivatedRoute } from '@angular/router';
import { BallotComponent } from '../ballot/ballot.component';

@Component({
  selector: 'app-vote',
  templateUrl: './vote.component.html',
  styleUrls: ['./vote.component.scss']
})
export class VoteComponent implements OnInit {

  @ViewChild(BallotComponent) public ballot;

  electionId: string;
  urlBase: string = environment.apiUrl;
  election: any = {
    ballot: []
  };
  submitted: boolean = false;

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
            if(sessionStorage.getItem('voted') === this.election.id){
              this.router.navigate(['thank-you']);
            }
          }
        },
        (err) => {
          
      });
  }

  onSubmit(f){
    this.submitted = true;
    if(f.invalid){
      window.scrollTo( 0, 0);
      return
    }

    let payload = {
      electionId: this.election.id,
      voter: f.value,
      ballot: this.election.ballot,
      votes: this.ballot.model
    }

    var headers = new Headers();
    this.http.post(this.urlBase + '/save/vote', payload,{headers:headers})
      .subscribe(
        (res) => {
          if(res.status == 200){
            sessionStorage.setItem('voted', this.election.id);
            this.router.navigate(['thank-you']);
          }
        },
        (err) => {

      });

  }

  ngOnInit() {
    this.loadElection();
  }

}
