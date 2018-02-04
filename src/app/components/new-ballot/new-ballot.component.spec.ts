import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewBallotComponent } from './new-ballot.component';

describe('NewBallotComponent', () => {
  let component: NewBallotComponent;
  let fixture: ComponentFixture<NewBallotComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewBallotComponent ]
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
