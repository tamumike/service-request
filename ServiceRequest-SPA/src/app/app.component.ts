import { Component, OnInit } from '@angular/core';
import { ModalService } from './services/modal.service';
import { Router } from '@angular/router';
import { ModalBodyItem } from './models/modalBodyItem';
import { UserService } from './services/user.service';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'ServiceRequest-SPA';
  modalConfig: any;
  modals: {success: ModalBodyItem, error: ModalBodyItem};
  user: any;

  constructor(private modalService: ModalService, private router: Router,
              private userService: UserService) {}

  ngOnInit() {

    this.userService.login().subscribe(response => {
      this.user = response;
    }, error => {
      console.log('app component, login', error);
    });

    this.modals = this.modalService.getModals();
    this.router.navigate([{ outlets: { primary: '', sidebar: 'requests-overview' }}]);
    this.modalService.displayModal.subscribe(modalConfig => this.modalConfig = modalConfig);
  }
}
