/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { GetRequestsResolverService } from './get-requests-resolver.service';

describe('Service: GetRequestsResolver', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [GetRequestsResolverService]
    });
  });

  it('should ...', inject([GetRequestsResolverService], (service: GetRequestsResolverService) => {
    expect(service).toBeTruthy();
  }));
});
