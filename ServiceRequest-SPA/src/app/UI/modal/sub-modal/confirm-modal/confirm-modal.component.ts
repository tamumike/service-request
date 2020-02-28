import { Component, Input } from '@angular/core';
import { ModalBodyComponent } from 'src/app/models/modalBodyComponent';

@Component({
  selector: 'app-confirm-modal',
  templateUrl: './confirm-modal.component.html',
  styleUrls: ['./confirm-modal.component.css']
})
export class ConfirmModalComponent implements ModalBodyComponent {
  @Input() data: any;

  close() {
    this.data.close();
  }
}
