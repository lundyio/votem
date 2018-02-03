import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FooterComponent } from './footer.component';

describe('FooterComponent', () => {
  let component: FooterComponent;
  let fixture: ComponentFixture<FooterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FooterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FooterComponent);
    component = fixture.componentInstance;
    fixture.autoDetectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should stick to the bottom if the content is smaller than the window', () => {
    component.windowHeight = 1000;
    component.ngOnInit();
    expect(component.sticky).toBeTruthy();
  });

  it('should stick to the content if the content is larger than the window', () => {
    component.windowHeight = 0;
    component.ngOnInit();
    expect(component.sticky).toBeFalsy();
  });

});
