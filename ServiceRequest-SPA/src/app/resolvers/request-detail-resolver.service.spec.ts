/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { RequestDetailResolverService } from './request-detail-resolver.service';

describe('Service: RequestDetailResolver', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [RequestDetailResolverService]
    });
  });

  it('should ...', inject([RequestDetailResolverService], (service: RequestDetailResolverService) => {
    expect(service).toBeTruthy();
  }));
});
