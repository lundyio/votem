import { TestBed, inject } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AuthGuard } from './auth-guard.service';
import { AuthService } from '../auth/auth.service';

describe('AuthGuardService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AuthGuard, AuthService],
      imports: [ RouterTestingModule ] 
    });
  });

  it('should be created', inject([AuthGuard], (service: AuthGuard) => {
    expect(service).toBeTruthy();
  }));

  it('should return true if route can activate', inject([AuthGuard, AuthService], (service: AuthGuard, auth: AuthService) => {
    auth.logIn();
    service.canActivate();
    expect(service.canActivate).toBeTruthy();
  }));

  it('should return false if not authorized', inject([AuthGuard, AuthService], (service: AuthGuard, auth: AuthService) => {
    let navigate = spyOn((<any>service).router, 'navigate');

    auth.endSession();
    service.canActivate();
    expect(navigate).toHaveBeenCalledWith(['/login']);
  }));

});
