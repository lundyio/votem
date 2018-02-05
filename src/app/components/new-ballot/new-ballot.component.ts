import { Component, OnInit } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { environment } from '../../../environments/environment';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-new-ballot',
  templateUrl: './new-ballot.component.html',
  styleUrls: ['./new-ballot.component.scss']
})
export class NewBallotComponent implements OnInit {

  urlBase: string = environment.apiUrl;
  electionId: string;
  election: any = {
    name: ''
  };
  options: any[] = [];
  optionsCount: number = 0;

  constructor(private http: Http, private router: Router, private route: ActivatedRoute) {

  }

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
          }
        },
        (err) => {
          
      });
  }

  saveQuestion(type){

    if(typeof(this.election.ballot) == 'string'){
      this.election.ballot = new Array;
    }

    this.election.ballot.push({
      type: type
    })
    console.log(this.election.ballot);
  }

  removeOption(i){
    this.options.splice(i, 1);
  }

  addOption(){
    this.options.push(this.optionsCount + 1)
    this.optionsCount++
  }

  onSubmit(f){
    console.log(f);
  }

  ngOnInit() {

    this.loadElection();

  }

}

export class Option {
  constructor(
    public id: string,
    public name: string
  ) { }
}
