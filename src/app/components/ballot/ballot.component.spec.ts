import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { FormsModule } from '@angular/forms'

import { BallotComponent } from './ballot.component';

describe('BallotComponent', () => {
  let component: BallotComponent;
  let fixture: ComponentFixture<BallotComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BallotComponent ],
      imports: [ RouterTestingModule, FormsModule ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BallotComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
