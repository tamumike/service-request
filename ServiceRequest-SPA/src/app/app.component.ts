import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from './services/user.service';
import { forkJoin } from 'rxjs';
import { RequestService } from './services/request.service';
import { tap } from 'rxjs/operators';
import { MatDialogConfig, MatDialog } from '@angular/material/dialog';
import { ModalComponent } from './UI/modal/modal.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'ServiceRequest-SPA';
  user: any;
  appReady = false;

  constructor(private router: Router, private userService: UserService,
              private requestService: RequestService, public matDialog: MatDialog) {}

  ngOnInit() {

    forkJoin([
      this.userService.login().pipe(tap(res => this.userService.user = res, res => this.userService.sessionID = res.sessionID)),
      this.requestService.getLocations().pipe(tap(res => this.requestService.locations = res)),
      this.userService.getGroupMembers().pipe(tap(res => this.userService.groupMembers = res))
    ]).subscribe(() => {
        setTimeout(() => {
          this.appReady = true;
        }, 1000);
    });

    this.router.navigate([{ outlets: { primary: '', sidebar: 'requests-overview' }}]);
  }

  openModal() {
    const dialogConfig = new MatDialogConfig();
    // The user can't close the dialog by clicking outside its body
    dialogConfig.disableClose = true;
    dialogConfig.id = 'modal-component';
    dialogConfig.height = '350px';
    dialogConfig.width = '600px';
    dialogConfig.data = {
      name: 'logout',
      title: 'Are you sure you want to logout?',
      description: 'Pretend this is a convincing argument on why you shouldn\'t logout :)',
      actionButtonText: 'Logout',
    };

    const modalDialog = this.matDialog.open(ModalComponent, dialogConfig);
  }

}
