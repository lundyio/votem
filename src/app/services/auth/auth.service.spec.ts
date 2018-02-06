import { TestBed, inject } from '@angular/core/testing';
import { RouterTestingModule, } from '@angular/router/testing';
import { AuthService } from './auth.service';

describe('AuthService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      providers: [AuthService]
    });
  });

  beforeEach(() => {
      let service = AuthService;
  });

  it('should be created', inject([AuthService], (service: AuthService) => {
    expect(service).toBeTruthy();
  }));

  it('it should start a session if login is called', inject([AuthService], (service: AuthService) => {
    service.logIn();
    expect(service.startSession).toHaveBeenCalled;
  }));

  it('it should end the session if logout is called', inject([AuthService], (service: AuthService) => {
    service.logOut();
    expect(service.endSession).toHaveBeenCalled;
  }));

  it('it should redirect to login page if not logged in', inject([AuthService], (service: AuthService) => {
    let navigate = spyOn((<any>service).router, 'navigate');

    service.logOut();
    service.isLoggedIn();
    expect(navigate).toHaveBeenCalledWith(['/login']);
  }));

});
