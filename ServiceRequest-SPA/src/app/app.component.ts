import { Component, OnInit } from '@angular/core';
import { ModalService } from './services/modal.service';
import { Router } from '@angular/router';
import { ModalBodyItem } from './models/modalBodyItem';
import { UserService } from './services/user.service';
import { CookieService } from 'ngx-cookie-service';
import { forkJoin } from 'rxjs';
import { RequestService } from './services/request.service';
import { tap } from 'rxjs/operators';

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
  appReady = false;

  constructor(private modalService: ModalService, private router: Router,
              private userService: UserService, private requestService: RequestService) {}

  ngOnInit() {

    this.modals = this.modalService.getModals();
    this.modalService.displayModal.subscribe(modalConfig => this.modalConfig = modalConfig);

    this.modalService.toggleDisplay({display: true, type: 'loading'});

    forkJoin([
      this.userService.login().pipe(tap(res => this.userService.user = res, res => this.userService.sessionID = res.sessionID)),
      this.requestService.getLocations().pipe(tap(res => this.requestService.locations = res)),
      this.requestService.getPropertyCodes().pipe(tap(res => this.requestService.propCodes = res)),
      this.userService.getGroupMembers().pipe(tap(res => this.userService.groupMembers = res))
    ]).subscribe(() => {
      this.appReady = true;
      this.modalService.toggleDisplay({display: false});
    });

    this.router.navigate([{ outlets: { primary: '', sidebar: 'requests-overview' }}]);
  }
}
