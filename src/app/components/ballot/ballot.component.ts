import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-ballot',
  templateUrl: './ballot.component.html',
  styleUrls: ['./ballot.component.scss']
})
export class BallotComponent implements OnInit {

  @Input() election: {id: string};

  constructor() { }

  ngOnInit() {

  }

}
