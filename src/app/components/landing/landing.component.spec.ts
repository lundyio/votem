import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Component } from '@angular/core';
import { LandingComponent } from './landing.component';
import { HeaderComponent } from '../header/header.component';
import { FormsModule }   from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterTestingModule } from '@angular/router/testing';

describe('LandingComponent', () => {
  let component: LandingComponent;
  let fixture: ComponentFixture<LandingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LandingComponent, HeaderComponent ],
      imports: [ FormsModule, HttpModule, RouterTestingModule ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LandingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    spyOn(component, 'onSubmit').and.callThrough();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should submit the button is clocked', () => {
    let button = fixture.debugElement.nativeElement.querySelector('button');
    button.click();
    expect(component.onSubmit).toHaveBeenCalled();
  });

  it('should set invalid to true if the form is invalid', () => {
    let f = {
      invalid: true
    }
    component.onSubmit(f);
    expect(component.invalid).toBeTruthy();;
  });

});

@Component({
  selector: 'app-header',
  template: ''
})
class MockHeaderComponent {
}