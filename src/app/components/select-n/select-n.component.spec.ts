import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectNComponent } from './select-n.component';

describe('SelectNComponent', () => {
  let component: SelectNComponent;
  let fixture: ComponentFixture<SelectNComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SelectNComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectNComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
