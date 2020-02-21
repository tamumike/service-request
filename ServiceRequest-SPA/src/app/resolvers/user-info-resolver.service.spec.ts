/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { UserInfoResolverService } from './user-info-resolver.service';

describe('Service: UserInfoResolver', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [UserInfoResolverService]
    });
  });

  it('should ...', inject([UserInfoResolverService], (service: UserInfoResolverService) => {
    expect(service).toBeTruthy();
  }));
});
