import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { ModalBodyItem } from '../models/modalBodyItem';
import { SuccessModalComponent } from '../UI/modal/sub-modal/success-modal/success-modal.component';
import { ErrorModalComponent } from '../UI/modal/sub-modal/error-modal/error-modal.component';
import { LoadingModalComponent } from '../UI/modal/sub-modal/loading-modal/loading-modal.component';

@Injectable({
  providedIn: 'root'
})
export class ModalService {

  private displaySource = new BehaviorSubject({display: false, type: ''});
  displayModal = this.displaySource.asObservable();

  toggleDisplay(config: any) {
    this.displaySource.next(config);
  }

  getModals() {
    return {
      success: new ModalBodyItem(SuccessModalComponent, {name: 'success', content: 'success content'}),
      error: new ModalBodyItem(ErrorModalComponent, {name: 'error', content: 'error content'}),
      loading: new ModalBodyItem(LoadingModalComponent, {name: 'loading', content: 'loading content'})
      };
  }
}
