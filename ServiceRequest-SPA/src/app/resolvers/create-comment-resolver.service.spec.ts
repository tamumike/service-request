/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { CreateCommentResolverService } from './create-comment-resolver.service';

describe('Service: CreateCommentResolver', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CreateCommentResolverService]
    });
  });

  it('should ...', inject([CreateCommentResolverService], (service: CreateCommentResolverService) => {
    expect(service).toBeTruthy();
  }));
});
