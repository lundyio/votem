import { Component, OnInit } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  urlBase: string = environment.apiUrl;
  now: any = new Date();
  elections: any;
  activeElections: Array<Election> = [];
  futureElections: Array<Election> = [];
  pastElections: Array<Election> = [];

  constructor(private http: Http) { }

  // gets election data from server
  getElections(){
    var headers = new Headers();
    this.http.get(this.urlBase + '/get/elections', {headers:headers}).subscribe(
      (res) => {
        if(res.status == 200){
          this.elections = JSON.parse(res['_body']);
          for (var i = 0; i < this.elections.length; i++) {
            this.sortElection(this.elections[i]);
          }
        }
      });
  }

  // sorts elections into active, future, and past
  sortElection(election){

    let beginDate = Date.parse(election.dateRange.beginJsDate);
    let endDate = Date.parse(election.dateRange.endJsDate);
    let created = Date.parse(election.created);
    let now = Date.parse(this.now);
    let newish = false;

    // Show that elections are new for 10 minutes
    if( Math.floor(((now - created)/1000)/60) < 10){
      newish = true;
    }

    // Sort Future Elections
    if(beginDate - now > 0){
      this.futureElections.push({
        id: election.id,
        name:election.name,
        newish: newish,
        created: election.created,
        startDate:election.dateRange.beginJsDate,
        endDate: election.dateRange.endJsDate,
        ballot: election.ballot,
        ballotsCollected: election.ballotsCollected
      });
      this.futureElections.sort(this.sortStartDec);
    }

    // Sort Past Elections
    if((beginDate - now < 0) && (now - endDate > 0)){
      this.pastElections.push({
        id: election.id,
        name:election.name,
        newish: newish,
        created: election.created,
        startDate:election.dateRange.beginJsDate,
        endDate: election.dateRange.endJsDate,
        ballot: election.ballot,
        ballotsCollected: election.ballotsCollected
      });
      this.pastElections.sort(this.sortEndDec);
    }

    // Sort Active Elections
    if((beginDate - now < 0) && (now - endDate < 0)){
      this.activeElections.push({
        id: election.id,
        name:election.name,
        newish: newish,
        created: election.created,
        startDate:election.dateRange.beginJsDate,
        endDate: election.dateRange.endJsDate,
        ballot: election.ballot,
        ballotsCollected: election.ballotsCollected
      });
      this.activeElections.sort(this.sortEndAsc);
    }
    
  }

  // sort by start date decending
  sortStartDec(item1, item2) {
    item1 = Date.parse(item1.startDate);
    item2 = Date.parse(item2.startDate);
    if (item1 > item2) return 1;
    if (item1 < item2) return -1;
    return 0;
  };

  // sort by end date decending
  sortEndDec(item1, item2) {
    item1 = Date.parse(item1.endDate);
    item2 = Date.parse(item2.endDate);
    if (item1 < item2) return 1;
    if (item1 > item2) return -1;
    return 0;
  };

  // sort by end date ascending
  sortEndAsc(item1, item2) {
    item1 = Date.parse(item1.endDate);
    item2 = Date.parse(item2.endDate);
    if (item1 > item2) return 1;
    if (item1 < item2) return -1;
    return 0;
  };
  

  ngOnInit() {

    this.getElections();

  }

}

// model for election rows
export class Election {
  constructor(
    public id: string,
    public name: string,
    public newish: boolean,
    public created: Date,
    public startDate: Date,
    public endDate: Date,
    public ballot: boolean,
    public ballotsCollected: number
  ) { }
}
