import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HeaderComponent } from '../header/header.component';
import { VoteComponent } from './vote.component';
import { RouterTestingModule } from '@angular/router/testing';
import { FormsModule } from '@angular/forms';
import { Input } from '@angular/core';
import { BallotComponent } from '../ballot/ballot.component';
import { HttpModule } from '@angular/http';
import { AuthService } from '../../services/auth/auth.service';

describe('VoteComponent', () => {
  let component: VoteComponent;
  let fixture: ComponentFixture<VoteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VoteComponent, HeaderComponent, BallotComponent ],
      imports: [ FormsModule, RouterTestingModule, HttpModule ],
      providers: [AuthService]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VoteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set submitted to false', () => {

    let f = {
      valid: true
    }

    component.onSubmit(f)
    expect(component.submitted).toBeTruthy();
  });

  it('should scroll to the top if there is an error', () => {

    spyOn(window, 'scrollTo').and.callThrough();

    let f = {
      invalid: true
    }

    component.onSubmit(f)
    expect(window.scrollTo).toHaveBeenCalled();
  });

});