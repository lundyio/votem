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

  handleChange(value, index){
    if(this.model[index]){
      
      if(this.model[index][value]){
        this.model[index][value] = false;
      } else {
        this.model[index][value] = true;
      }

    } else {
      this.model[index] = {};
      this.model[index][value] = true;
    }
  }

  handleKeypress(event, value, index){
    if(event.keyCode === 32){
      this.handleChange(value, index);
    } else {
      return
    }
  }

  isChecked(val, index){
    if(this.model[index]){
      if(this.model[index][val] === true){
        return true;
      } else {
        return false;
      }
    } else {
      return false;
    }
  }

  move = function(array, index, delta) {
    var newIndex = index + delta;
    if (newIndex < 0  || newIndex == array.length) return; //Already at the top or bottom.
    this.pendingChanges = true;
    var indexes = [index, newIndex].sort(); //Sort the indixes
    array.splice(indexes[0], 2, array[indexes[1]], array[indexes[0]]); //Replace from lowest index, two elements, reverting the order
  };

  moveUp(question, option){
    this.move(this.model[question], option, -1);
  }

  moveDown(question, option){
    this.move(this.model[question], option, 1);
  }

  // ngOnChanges(changes: SimpleChanges) {
  //   console.log(changes)
  // }

  ngOnInit() {

  }

}
