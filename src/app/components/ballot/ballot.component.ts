import { Component, OnInit, Input, OnChanges, SimpleChanges, SimpleChange } from '@angular/core';

@Component({
  selector: 'app-ballot',
  templateUrl: './ballot.component.html',
  styleUrls: ['./ballot.component.scss']
})
export class BallotComponent implements OnInit {

  @Input('election') election: any = {
    ballot: []
  };

  model: any = {};
  objectValues = Object.values;

  constructor() { }

  getValues(index){
    if(!this.model[index]){
      this.model[index] = Object.values(this.election.ballot[index].options);
    }

    return this.model[index];
    
  }

  // Sort data from select-n questions
  handleChange(value, index){
    /* 
      if the model doesnt exist yet create it and add value
      if it does push in value, if already exists, remove it
    */
    if(this.model[index]){
      if(this.model[index].indexOf(value) < 0){
        this.model[index].push(value);
      } else {
        this.model[index].splice(this.model[index].indexOf(value), 1);
      }
    } else {
      this.model[index] = [];
      this.model[index].push(value);
    }  
  }

  // Accessibility helper for fake radio buttons
  handleKeypress(event, value, index, type){
    if(event.keyCode === 32){
      if(type === 'select-one'){
        this.model[index] = value;
      } else {
        this.handleChange(value, index);
      }
    } else {
      return
    }
  }


  isChecked(val, index){
    if(this.model[index]){
      if(this.model[index].indexOf(val) > -1){
        return true;
      } else {
        return false;
      }
    } else {
      return false;
    }
  }

  // Does the actual moving
  move = function(array, index, delta) {
    var newIndex = index + delta;
    if (newIndex < 0  || newIndex == array.length) return; //Already at the top or bottom.
    this.pendingChanges = true;
    var indexes = [index, newIndex].sort(); //Sort the indixes
    array.splice(indexes[0], 2, array[indexes[1]], array[indexes[0]]); //Replace from lowest index, two elements, reverting the order
  };

  // moves the ranked options up
  moveUp(question, option){
    this.move(this.model[question], option, -1);
  }

  // moves the ranked options down
  moveDown(question, option){
    this.move(this.model[question], option, 1);
  }


  ngOnInit() {

  }

}
