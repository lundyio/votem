import { async, ComponentFixture, TestBed, inject } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { LoginComponent } from './login.component';
import { HeaderComponent } from '../header/header.component';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth/auth.service';
import { componentFactoryName } from '@angular/compiler';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoginComponent, HeaderComponent ],
      imports: [ RouterTestingModule, FormsModule ],
      providers: [ AuthService ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    let auth = AuthService;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set invalid to true if the form is invalid', () => {

    let f = {
      invalid: true,
    }
    component.onSubmit(f)
    expect(component.invalid).toBeTruthy();
  });

  it('should set invalid to true if the username or password do now match', () => {

    let f = {
      invalid: true,
      value: {
        username: 'billy',
        password: 'madison'
      }
    }
    component.onSubmit(f)
    expect(component.invalid).toBeTruthy();
  });

  it('it should attempt to login if the un/pw match', inject([AuthService], (service: AuthService) => {
    
    spyOn(service, 'logIn').and.callThrough();

    let f = {
      invalid: false,
      value: {
        username: 'admin',
        password: 'password'
      }
    }

    component.onSubmit(f);
    expect(service.logIn).toHaveBeenCalled();
  }));

  it('it should redirect to admin page if already logged in', inject([AuthService], (service: AuthService) => {
    let navigate = spyOn((<any>service).router, 'navigate');

    service.logIn();
    component.ngOnInit();
    expect(navigate).toHaveBeenCalledWith(['/admin']);
  }));

});
