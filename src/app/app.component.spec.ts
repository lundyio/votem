import { TestBed, async } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { RouterTestingModule } from '@angular/router/testing';
import fontawesome from '@fortawesome/fontawesome'

describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent
      ],
      imports: [ RouterTestingModule ]
    }).compileComponents();

    spyOn(fontawesome, 'icon').and.callThrough();

  }));
  it('should create the app', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));

  it('should load icons', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.componentInstance.ngOnInit();
    expect(fontawesome.icon).toHaveBeenCalled();
  }));

});
