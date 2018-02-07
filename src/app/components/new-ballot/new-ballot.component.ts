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

  // get form data from child
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
  model: any = {
    options: {}
  };
  edit: boolean = false;
  editIndex: number;
  adding: boolean = false;
  error: boolean = false;
  errorMessage: string;
  pendingChanges: boolean = false;

  constructor(private http: Http, private router: Router, private route: ActivatedRoute) {

  }

  // load election data
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

  // delete question
  deleteQuestion(i){
    this.pendingChanges = true;
    this.election.ballot.splice(i, 1);
  }

  // load question data into the model to be edited, and enter "editing" mode
  editQuestion(i){
    this.edit = true;
    this.adding = true;
    this.editIndex = i;

    // loop through, prepare, and load options
    if(this.optionsCount === 0){
      this.optionsCount = Object.keys(this.election.ballot[i].options).length -1;
      for (var x = 0; x <= this.optionsCount; x++){
        if(x != this.optionsCount){
          this.options.push(this.optionsCount);
        }
        this.model.options = this.election.ballot[i].options;
      }
    }

    // load data into model
    this.model.question = this.election.ballot[i].question;
    this.model.questionType = this.election.ballot[i].questionType;

  }

  // clean up model after an option is removed
  scrubOptions(){
    let newModel = {
      options: {}
    };
    for ( var n = 0; n < Object.keys(this.model.options).length; n++ ){
      newModel.options['option' + (n+1)] = Object.values(this.model.options)[n]
    }
    this.model.options = newModel.options;
  }

  // remove and option
  removeOption(i){
    this.options.splice(i, 1);
    delete this.model.options['option' + (i+2)];
    this.scrubOptions();
  }

  // add an option
  addOption(){
    this.options.push(this.optionsCount + 1)
    this.optionsCount++
  }

  // move questions
  move = function(array, index, delta) {
    var newIndex = index + delta;
    if (newIndex < 0  || newIndex == array.length) return; //Already at the top or bottom.
    this.pendingChanges = true;
    var indexes = [index, newIndex].sort(); //Sort the indixes
    array.splice(indexes[0], 2, array[indexes[1]], array[indexes[0]]); //Replace from lowest index, two elements, reverting the order
  };

  // move question up
  moveUp(i){
    this.move(this.election.ballot, i, -1);
  }

  // move question down
  moveDown(i){
    this.move(this.election.ballot, i, 1);
  }

  // cancels current user input and reloads data from the server
  cancel(){
    this.edit = false;
    this.adding = false;
    this.pendingChanges = false;
    this.submitted = false;
    this.options = [];
    this.optionsCount = 0;
    this.loadElection();
  }

  // load the data from the model back into the election data and do some resetting
  onSubmit(edit){
    this.submitted = true;
    if(this.f.valid){
      if(!this.election.ballot){
        this.election.ballot = [];
      }
      if(this.edit){
        this.election.ballot[this.editIndex] = this.model;
      } else if(Object.keys(this.model).length > 1) {
        this.election.ballot.push(this.model);
      }
      this.model = {
        options: {}
      };
      this.f.reset();
      this.submitted = false;
      this.edit = false;
      this.adding = false;
      this.pendingChanges = false;
      this.options = [];
      this.optionsCount = 0;
      this.save();
    }
  }

  // save the data to the server
  save(){
    let payload = {
      id: this.election.id,
      ballot: this.election.ballot
    }
    var headers = new Headers();
    this.http.post(this.urlBase + '/save/ballot',payload,{headers:headers})
      .subscribe(
        (res) => {
          if(res.status == 200){
            this.loadElection();
          }
        },
        (err) => {
          this.error = true;
          if(err){
            this.errorMessage = 'There was an error saving this ballot please try again.'
          }
      });
  }

  ngOnInit() {

    this.loadElection();

  }

}
