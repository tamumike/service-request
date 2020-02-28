import { Component, Input, Output, EventEmitter } from '@angular/core';
import { ModalBodyComponent } from 'src/app/models/modalBodyComponent';

@Component({
  selector: 'app-success-modal',
  templateUrl: './success-modal.component.html',
  styleUrls: ['./success-modal.component.css']
})
export class SuccessModalComponent implements ModalBodyComponent {
  @Input() data: any;

  constructor() {
    setTimeout(() => {
      this.close();
    }, 10000);
  }

  close() {
    this.data.close();
  }
}
