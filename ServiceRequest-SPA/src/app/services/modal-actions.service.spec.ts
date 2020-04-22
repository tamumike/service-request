/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { ModalActionsService } from './modal-actions.service';

describe('Service: ModalActions', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ModalActionsService]
    });
  });

  it('should ...', inject([ModalActionsService], (service: ModalActionsService) => {
    expect(service).toBeTruthy();
  }));
});
