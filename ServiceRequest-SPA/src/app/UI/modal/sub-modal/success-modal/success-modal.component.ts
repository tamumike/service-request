import { Component, Input } from '@angular/core';
import { ModalBodyComponent } from 'src/app/models/modalBodyComponent';

@Component({
  selector: 'app-success-modal',
  templateUrl: './success-modal.component.html',
  styleUrls: ['./success-modal.component.css']
})
export class SuccessModalComponent implements ModalBodyComponent {
  @Input() data: any;
}
