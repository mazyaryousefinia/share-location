import { TestBed } from '@angular/core/testing';

import { ShareLocationService } from './share-location.service';

describe('ShareLocationService', () => {
  let service: ShareLocationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ShareLocationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
