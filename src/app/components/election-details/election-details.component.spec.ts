import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { BallotComponent } from '../ballot/ballot.component';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { Input } from '@angular/core';
import { ElectionDetailsComponent } from './election-details.component';
import { BackComponent } from '../back/back.component';
import { GraphBarComponent } from '../graph-bar/graph-bar.component';
import { GraphLineComponent } from '../graph-line/graph-line.component';
import { ChartsModule } from 'ng2-charts';

describe('ElectiondetailsComponent', () => {
  let component: ElectionDetailsComponent;
  let fixture: ComponentFixture<ElectionDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ElectionDetailsComponent, BallotComponent, BackComponent, GraphBarComponent, GraphLineComponent ],
      imports: [ RouterTestingModule, FormsModule, HttpModule, ChartsModule ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ElectionDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
