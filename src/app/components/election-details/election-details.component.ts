import { Component, OnInit } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { environment } from '../../../environments/environment';
import { Router, ActivatedRoute } from '@angular/router';
import { ElectionDataService } from '../../services/election-data/election-data.service';

@Component({
  selector: 'app-election-details',
  templateUrl: './election-details.component.html',
  providers: [ElectionDataService],
  styleUrls: ['./election-details.component.scss']
})
export class ElectionDetailsComponent implements OnInit {

  urlBase: string = environment.apiUrl;
  electionId: string;
  status: string = 'Checking...'
  active: boolean = false;
  results: any = [];
  election: any = {
    name: '',
    ballot: '',
    created: '',
    dateRange: {
      beginJsRange: '',
      endJsRange: ''
    }
  };

  constructor(private http: Http, private router: Router, private route: ActivatedRoute, private loaderService: ElectionDataService) {
    this.route.params.subscribe(params => {
      this.electionId = params['id'];
    });
  }

  getResults(){

    var headers = new Headers();
    this.http.get(this.urlBase + '/get/votes/' + this.election.id, {headers:headers}).subscribe(
      (res) => {
        if(res.status == 200){
          this.results = JSON.parse(res['_body']);
          console.log(this.results);
        }
      });

  }

  ngOnInit() {

    // ask for election data then asign it if all goes well, then set status
    this.loaderService.getElection(this.electionId)
      .then(() => {
        this.election = this.loaderService.election;
        this.getResults();
      });     

  }

}
