import { Component, OnInit } from '@angular/core';
import { ModalService } from './services/modal.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'ServiceRequest-SPA';
  modalConfig: any;

  constructor(private modalService: ModalService, private router: Router) {}

  ngOnInit() {
    this.router.navigate([{ outlets: { primary: '', sidebar: 'requests-overview' }}]);
    this.modalService.displayModal.subscribe(modalConfig => this.modalConfig = modalConfig);
  }
}
