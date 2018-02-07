import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ChartsModule } from 'ng2-charts';
import { GraphBarComponent } from './graph-bar.component';
import { ElectionDetailsComponent } from '../election-details/election-details.component';

describe('GraphBarComponent', () => {
  let component: GraphBarComponent;
  let fixture: ComponentFixture<GraphBarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GraphBarComponent ],
      imports: [ChartsModule]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GraphBarComponent);
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
  
    fixture.autoDetectChanges();

  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
