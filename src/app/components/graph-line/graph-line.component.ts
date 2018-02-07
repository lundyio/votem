import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-graph-line',
  templateUrl: './graph-line.component.html',
  styleUrls: ['./graph-line.component.scss']
})
export class GraphLineComponent implements OnInit {

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
      this.masterObj[Object.values(this.ballot.options)[i]] = {};

      for (var n=0; n < Object.keys(this.ballot.options).length; n++){
        let key = Object.keys(this.ballot.options)[n];
        Object.values(this.masterObj)[i][Object.keys(this.ballot.options)[n]] = 0;
      }

    }
  }

  setLables(){
    this.chartLabels = Object.keys(this.masterObj);
  }

  setData(){

    console.log(this.masterObj);

    for (var i=0; i < Object.keys(this.masterObj[Object.keys(this.masterObj)[0]]).length; i++){
      this.chartData.push({
        label: 'Choice ' + (i+1)
      })
    }

    for (var i=0; i < Object.keys(this.masterObj).length; i++){
      this.chartData[i].data = Object.values(this.masterObj[Object.keys(this.masterObj)[i]])
    }
  }

  countVotes(){
    for (var i=0; i < this.results.length; i++){
      for (var n=0; n < this.results[i][this.index].length; n++){
      let opKey = Object.keys(this.masterObj[this.results[i][this.index][n]])[n];
      this.masterObj[this.results[i][this.index][n]][opKey]++
      }
    }
  }

  // chartColors = [
  //   {
  //     backgroundColor: 'rgba(105,74,135, 0.1)',
  //     borderColor: 'rgb(105,74,135)',
  //     pointBackgroundColor: 'rgb(105,74,135)',
  //     pointBorderColor: '#fff',
  //     pointHoverBackgroundColor: '#fff',
  //     pointHoverBorderColor: 'rgba(103, 58, 183, .8)'
  //   },
  //   {
  //     backgroundColor: 'rgba(43,26,58, .1)',
  //     borderColor: 'rgb(43,26,58)',
  //     pointBackgroundColor: 'rgb(43,26,58)',
  //     pointBorderColor: '#fff',
  //     pointHoverBackgroundColor: '#fff',
  //     pointHoverBorderColor: 'rgba(103, 58, 183, .8)'
  //   },
  //   {
  //     backgroundColor: 'rgba(148,127,96, .1)',
  //     borderColor: 'rgb(148,127,96)',
  //     pointBackgroundColor: 'rgb(148,127,96)',
  //     pointBorderColor: '#fff',
  //     pointHoverBackgroundColor: '#fff',
  //     pointHoverBorderColor: 'rgba(103, 58, 183, .8)'
  //   },
  //   {
  //     backgroundColor: 'rgba(38,84,53, .1)',
  //     borderColor: 'rgb(38,84,53)',
  //     pointBackgroundColor: 'rgb(38,84,53)',
  //     pointBorderColor: '#fff',
  //     pointHoverBackgroundColor: '#fff',
  //     pointHoverBorderColor: 'rgba(103, 58, 183, .8)'
  //   },
  //   {
  //     backgroundColor: 'rgba(105,211,141, .1)',
  //     borderColor: 'rgb(105,211,141)',
  //     pointBackgroundColor: 'rgb(105,211,141)',
  //     pointBorderColor: '#fff',
  //     pointHoverBackgroundColor: '#fff',
  //     pointHoverBorderColor: 'rgba(103, 58, 183, .8)'
  //   }
  // ];

  chartColors = [
    {
      backgroundColor: 'rgba(105,74,135, 0.1)',
      borderColor: 'rgb(105,74,135)',
      pointBackgroundColor: 'rgb(105,74,135)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(103, 58, 183, .8)'
    },
    {
      backgroundColor: 'rgba(186,83,176, .1)',
      borderColor: 'rgb(186,83,176)',
      pointBackgroundColor: 'rgb(186,83,176)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(103, 58, 183, .8)'
    },
    {
      backgroundColor: 'rgba(237,35,217, .1)',
      borderColor: 'rgb(237,35,217)',
      pointBackgroundColor: 'rgb(237,35,217)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(103, 58, 183, .8)'
    },
    {
      backgroundColor: 'rgba(148,145,118, .1)',
      borderColor: 'rgb(148,145,118)',
      pointBackgroundColor: 'rgb(148,145,118)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(103, 58, 183, .8)'
    },
    {
      backgroundColor: 'rgba(186,166,83, .1)',
      borderColor: 'rgb(186,166,83)',
      pointBackgroundColor: 'rgb(186,166,83)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(103, 58, 183, .8)'
    }
  ]

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
