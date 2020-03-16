import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { ModalBodyItem } from '../models/modalBodyItem';
import { SuccessModalComponent } from '../UI/modal/sub-modal/success-modal/success-modal.component';
import { ErrorModalComponent } from '../UI/modal/sub-modal/error-modal/error-modal.component';
import { LoadingModalComponent } from '../UI/modal/sub-modal/loading-modal/loading-modal.component';
import { ConfirmModalComponent } from '../UI/modal/sub-modal/confirm-modal/confirm-modal.component';

@Injectable({
  providedIn: 'root'
})
export class ModalService {

  private displaySource = new BehaviorSubject({display: false, type: ''});
  displayModal = this.displaySource.asObservable();
  closeModal = () => this.toggleDisplay({display: false});

  getModal() {
    return this.displayModal;
  }

  toggleDisplay(config: any) {
    this.displaySource.next(config);
  }

  hideModal(): void {
    this.displaySource.next({ display: false, type: '' });
  }

  getModals() {
    return {
      success: new ModalBodyItem(
        SuccessModalComponent,
        {
          name: 'Success!',
          content: 'Operation successfully completed!',
          close: this.closeModal
        }),
      error: new ModalBodyItem(
        ErrorModalComponent,
        {
          name: 'Something went wrong....',
          content: 'Sorry, there was an error. Please try again.',
          close: this.closeModal
        }),
      loading: new ModalBodyItem(
        LoadingModalComponent,
        {
          name: 'Loading....',
          content: 'Please wait for the operation to complete.',
          close: this.closeModal
        }),
      confirm: new ModalBodyItem(
        ConfirmModalComponent,
          {
            name: 'Confirmation',
            content: 'Are you sure you want to submit?',
            close: this.closeModal
          })
      };
  }
}
