import { TestBed } from '@angular/core/testing';

import { RequestStoreService } from './request-store-service';

describe('RequestStoreService', () => {
  let service: RequestStoreService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RequestStoreService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
