import { Component, OnInit } from '@angular/core';
import { ModalService } from './services/modal.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'ServiceRequest-SPA';
  modalConfig: any;

  constructor(private modalService: ModalService) {}

  ngOnInit() {
    this.modalService.displayModal.subscribe(modalConfig => this.modalConfig = modalConfig);
  }
}
