import { Component, OnInit, ViewChild } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { environment } from '../../../environments/environment';
import { Router, ActivatedRoute } from '@angular/router';
import { BallotComponent } from '../ballot/ballot.component';
import { ElectionDataService } from '../../services/election-data/election-data.service';

@Component({
  selector: 'app-vote',
  templateUrl: './vote.component.html',
  styleUrls: ['./vote.component.scss'],
  providers: [ElectionDataService]
})
export class VoteComponent implements OnInit {

  @ViewChild(BallotComponent) public ballot;

  electionId: string;
  urlBase: string = environment.apiUrl;
  election: any = {
    ballot: []
  };
  submitted: boolean = false;

  constructor(private http: Http, private router: Router, private route: ActivatedRoute, private loaderService: ElectionDataService) {

    this.route.params.subscribe(params => {
      this.electionId = params['id'];
    });

  }

  // send vote to server, jumps to the top if there is a validation error because the form gets long
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
        });

  }

  ngOnInit() {

    // ask for election data then asign it if all goes well, if already voted redirect to ty page
    this.loaderService.getElection(this.electionId)
      .then(() => {
        this.election = this.loaderService.election;
        
        if(sessionStorage.getItem('voted') === this.election.id){
          this.router.navigate(['thank-you']);
        }

      })
      .catch(
        () => {
          console.log('Failed to retrieve content.')
        }
      );

  }

}
