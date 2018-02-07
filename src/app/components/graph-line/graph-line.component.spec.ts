import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { GraphLineComponent } from './graph-line.component';
import { ChartsModule } from 'ng2-charts';

describe('GraphLineComponent', () => {
  let component: GraphLineComponent;
  let fixture: ComponentFixture<GraphLineComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GraphLineComponent ],
      imports: [ChartsModule]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GraphLineComponent);
    component = fixture.componentInstance;
    
    component.chartData = [
      { data: [330, 600, 260, 700], label: 'Account A' },
    ]
  
    component.chartLabels = ['January', 'February', 'Mars', 'April'];
  
    component.chartOptions = {
      responsive: true
    };

    component.chartColors = [
      {
        backgroundColor: 'rgba(103, 58, 183, .1)',
        borderColor: 'rgb(103, 58, 183)',
        pointBackgroundColor: 'rgb(103, 58, 183)',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: 'rgba(103, 58, 183, .8)'
      }
    ];

    component.masterObj = { "Coke": { "option1": 5, "option2": 2, "option3": 1, "option4": 2 }, "Diet Coke": { "option1": 1, "option2": 1, "option3": 8, "option4": 1 }, "Sprite": { "option1": 2, "option2": 8, "option3": 1, "option4": 0 }, "Water": { "option1": 3, "option2": 0, "option3": 1, "option4": 8 } };
  
    fixture.autoDetectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
