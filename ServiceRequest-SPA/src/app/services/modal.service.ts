import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ModalService {
  private displaySource = new BehaviorSubject({display: false, content: ''});
  displayModal = this.displaySource.asObservable();

constructor() { }

toggleDisplay(config: any) {
  this.displaySource.next(config);
}
}
