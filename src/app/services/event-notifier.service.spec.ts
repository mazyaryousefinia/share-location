import { TestBed } from '@angular/core/testing';

import { EventNotifierService } from './event-notifier.service';

describe('EventNotifierService', () => {
  let service: EventNotifierService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EventNotifierService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
