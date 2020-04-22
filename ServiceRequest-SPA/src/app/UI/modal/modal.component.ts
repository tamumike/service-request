import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ModalActionsService } from 'src/app/services/modal-actions.service';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<ModalComponent>, @Inject(MAT_DIALOG_DATA) public modalData: any,
              private modalService: ModalActionsService) { }

  ngOnInit() {
  }

  actionFunction() {
    this.modalService.modalAction(this.modalData);
    this.closeModal();
  }

  closeModal() {
    this.dialogRef.close();
  }

}
