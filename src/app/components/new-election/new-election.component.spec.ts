import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { NewElectionComponent } from './new-election.component';
import { componentFactoryName } from '@angular/compiler';
import { Component, Input } from '@angular/core';
import { HttpModule } from '@angular/http';
import { RouterTestingModule } from '@angular/router/testing';
import {Injector} from '@angular/core';
import {fakeAsync, tick} from '@angular/core/testing';
import {BaseRequestOptions, ConnectionBackend, Http, RequestOptions} from '@angular/http';
import {Response, ResponseOptions} from '@angular/http';
import {MockBackend, MockConnection} from '@angular/http/testing';
import { BackComponent } from '../back/back.component';

describe('NewElectionComponent', () => {
  let component: NewElectionComponent;
  let fixture: ComponentFixture<NewElectionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewElectionComponent, MockMyDateRangePicker, BackComponent ],
      imports: [ FormsModule, HttpModule, RouterTestingModule ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewElectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

});

describe('NewElectionComponent onSubmit', () => {
  let component: NewElectionComponent;
  let fixture: ComponentFixture<NewElectionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewElectionComponent, MockMyDateRangePicker, BackComponent ],
      imports: [ FormsModule, HttpModule, RouterTestingModule ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewElectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should set submitted to false', () => {

    let f = {
      valid: true
    }

    component.onSubmit(f)
    expect(component.submitted).toBeFalsy();
  });

});


@Component({
  selector: 'my-date-range-picker',
  template: ''
})
class MockMyDateRangePicker {

  @Input('options') options: any;

}
