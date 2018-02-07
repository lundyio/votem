import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-graph-bar',
  templateUrl: './graph-bar.component.html',
  styleUrls: ['./graph-bar.component.scss']
})
export class GraphBarComponent implements OnInit {

  @Input('results') results: any;
  @Input('ballot') ballot: any;
  @Input('index') index: any;


  chartOptions: any;
  chartData: any = [];
  chartLabels: any = [];
  masterObj: any = {};

  constructor() { }

  setupObj(){
    for (var i=0; i < Object.keys(this.ballot.options).length; i++){
      this.masterObj[Object.values(this.ballot.options)[i]] = 0;
    }
  }

  setLables(){
    this.chartLabels = Object.keys(this.masterObj);
  }

  setData(){
    this.chartData = [{
      label: this.ballot.question,
      data: Object.values(this.masterObj)
    }]
  }

  countVotes(){
    for (var i=0; i < this.results.length; i++){
      if(typeof(this.results[i][this.index]) === 'string'){
        this.masterObj[this.results[i][this.index]]++
      } else {
        for (var n=0; n < this.results[i][this.index].length; n++){
          this.masterObj[this.results[i][this.index][n]]++
        }
      }
    }
  }

  chartColors = [
    {
      backgroundColor: 'rgba(103,74,133, 0.1)',
      borderColor: 'rgb(103,74,133)',
      pointBackgroundColor: 'rgb(103, 58, 183)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(103, 58, 183, .8)'
    },
  ];

  ngOnInit() {

    this.setupObj();
    this.setLables();
    this.countVotes();
    this.setData();

    this.chartOptions = {
      responsive: true,
      scales: {
        yAxes: [{
            ticks: {
                beginAtZero: true
            }
        }]
      }
    };

  }

}
