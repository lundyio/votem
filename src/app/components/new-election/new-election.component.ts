import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms'

@Component({
  selector: 'app-new-election',
  templateUrl: './new-election.component.html',
  styleUrls: ['./new-election.component.scss']
})
export class NewElectionComponent implements OnInit {

  submitted: boolean = false;

  constructor() { }

  onSubmit(f){
    this.submitted = false;
    window.setTimeout(()=>{this.submitted = true;});
    console.log(f);
  }

  ngOnInit() {  

  }

}
