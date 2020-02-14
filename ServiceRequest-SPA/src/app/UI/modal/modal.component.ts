import { Component, OnInit } from '@angular/core';
import { ModalService } from 'src/app/services/modal.service';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent implements OnInit {
  modalConfig: any;
  constructor(private modalService: ModalService) { }

  ngOnInit() {
    this.modalService.displayModal.subscribe(modalConfig => this.modalConfig = modalConfig);
  }

  hideModal() {
    this.modalService.toggleDisplay({display: false, content: ''});
  }

}
