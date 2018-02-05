import { Component, OnInit, ViewChild } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { environment } from '../../../environments/environment';
import { Router, ActivatedRoute } from '@angular/router';
import { FormsModule, NgForm } from '@angular/forms';

@Component({
  selector: 'app-new-ballot',
  templateUrl: './new-ballot.component.html',
  styleUrls: ['./new-ballot.component.scss']
})
export class NewBallotComponent implements OnInit {

  @ViewChild('f') public f: NgForm;

  urlBase: string = environment.apiUrl;
  electionId: string;
  election: any = {
    name: '',
    ballot: []
  };
  options: any[] = [];
  optionsCount: number = 0;
  submitted: boolean = false;
  model: any = {};
  edit: boolean = false;
  editIndex: number;
  adding: boolean = false

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

  editQuestion(i){
    this.edit = true;
    this.adding = true;
    this.editIndex = i;

    if(this.optionsCount === 0){
      this.optionsCount = Object.keys(this.election.ballot[i]).length -3;
      for (var x = 0; x < this.optionsCount; x++){
        this.options.push(this.optionsCount)
      }
    }
    this.model = this.election.ballot[i];
  }

  removeOption(i){
    this.options.splice(i, 1);
    this.model['option' + (i+2)] = null;
  }

  addOption(){
    this.options.push(this.optionsCount + 1)
    this.optionsCount++
  }

  move = function(array, index, delta) {
    var newIndex = index + delta;
    if (newIndex < 0  || newIndex == array.length) return; //Already at the top or bottom.
    var indexes = [index, newIndex].sort(); //Sort the indixes
    array.splice(indexes[0], 2, array[indexes[1]], array[indexes[0]]); //Replace from lowest index, two elements, reverting the order
  };

  moveUp(i){
    this.move(this.election.ballot, i, -1);
  }

  moveDown(i){
    this.move(this.election.ballot, i, 1);
  }

  cancel(){
    this.f.reset();
    this.edit = false;
    this.adding = false;
    this.submitted = false;
    this.options = [];
    this.optionsCount = 0;
  }

  onSubmit(edit){
    this.submitted = true;

    console.log(edit);

    if(this.f.valid){
      console.log(this.model);
      if(!this.election.ballot){
        this.election.ballot = [];
      }

      if(this.edit){
        this.election.ballot[this.editIndex] = this.model;
      } else {
        this.election.ballot.push(this.model);
      }

      this.model = {};
      this.f.reset();
      this.submitted = false;
      this.edit = false;
      this.options = [];
      this.optionsCount = 0;
      console.log(this.election.ballot);
    }
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
