import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpModule } from '@angular/http';
import { BallotComponent } from '../ballot/ballot.component';
import { BackComponent } from '../back/back.component';
import { NewBallotComponent } from './new-ballot.component';

describe('NewBallotComponent', () => {
  let component: NewBallotComponent;
  let fixture: ComponentFixture<NewBallotComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewBallotComponent, BallotComponent, BackComponent ],
      imports: [ FormsModule, HttpModule, RouterTestingModule ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewBallotComponent);
    component = fixture.componentInstance;
    fixture.autoDetectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('expect adding to be set to true when editing', () => {
    component.editQuestion(0);
    expect(component.adding).toBeTruthy();
  });

  it('should call scubOptions if remove option is called', () => {
    spyOn(component, 'scrubOptions').and.callThrough();
    component.removeOption(0);
    expect(component.scrubOptions).toHaveBeenCalled();
  });

});
