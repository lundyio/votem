import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectRankedComponent } from './select-ranked.component';

describe('SelectRankedComponent', () => {
  let component: SelectRankedComponent;
  let fixture: ComponentFixture<SelectRankedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SelectRankedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectRankedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
