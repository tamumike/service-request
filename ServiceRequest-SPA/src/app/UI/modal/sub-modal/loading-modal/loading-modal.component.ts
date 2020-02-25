import { Component, Input } from '@angular/core';
import { ModalBodyComponent } from 'src/app/models/modalBodyComponent';

@Component({
  selector: 'app-loading-modal',
  templateUrl: './loading-modal.component.html',
  styleUrls: ['./loading-modal.component.css']
})
export class LoadingModalComponent implements ModalBodyComponent {
  @Input() data: any;
}
