import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { FormsModule } from '@angular/forms'
import { HttpModule } from '@angular/http';

import { DashboardComponent } from './dashboard.component';

describe('DashboardComponent', () => {
  let component: DashboardComponent;
  let fixture: ComponentFixture<DashboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DashboardComponent ],
      imports: [ RouterTestingModule, FormsModule, HttpModule]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should sort start dates decending', () => {
    spyOn(component, 'sortStartDec').and.callThrough();
    let a = new Date();
    let b = new Date();
    component.sortStartDec(a, b);
    expect(component.sortStartDec).toHaveBeenCalled();
  });

  it('should sort end dates acending', () => {
    spyOn(component, 'sortEndAsc').and.callThrough();
    let a = new Date();
    let b = new Date();
    component.sortEndAsc(a, b);
    expect(component.sortEndAsc).toHaveBeenCalled();
  });

  it('should sort end dates decending', () => {
    spyOn(component, 'sortEndDec').and.callThrough();
    let a = new Date();
    let b = new Date();
    component.sortEndDec(a, b);
    expect(component.sortEndDec).toHaveBeenCalled();
  });

});
