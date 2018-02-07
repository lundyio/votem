import { TestBed, inject } from '@angular/core/testing';
import { HttpModule } from '@angular/http';
import { RouterTestingModule } from '@angular/router/testing';
import { ElectionDataService } from './election-data.service';

describe('ElectionDataService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ElectionDataService],
      imports: [HttpModule, RouterTestingModule]
    });
  });

  it('should be created', inject([ElectionDataService], (service: ElectionDataService) => {
    expect(service).toBeTruthy();
  }));
});
