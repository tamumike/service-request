import { Component, Input } from '@angular/core';
import { ModalBodyComponent } from 'src/app/models/modalBodyComponent';

@Component({
  selector: 'app-error-modal',
  templateUrl: './error-modal.component.html',
  styleUrls: ['./error-modal.component.css']
})
export class ErrorModalComponent implements ModalBodyComponent {
  @Input() data: any;

  close() {
    this.data.close();
  }
}
