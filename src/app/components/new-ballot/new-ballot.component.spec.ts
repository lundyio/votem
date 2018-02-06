import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpModule } from '@angular/http';
import { BallotComponent } from '../ballot/ballot.component';
import { NewBallotComponent } from './new-ballot.component';

describe('NewBallotComponent', () => {
  let component: NewBallotComponent;
  let fixture: ComponentFixture<NewBallotComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewBallotComponent, BallotComponent ],
      imports: [ FormsModule, HttpModule, RouterTestingModule ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewBallotComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
