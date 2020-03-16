import { Component, OnInit, ViewChild, ComponentFactoryResolver, Input, OnDestroy } from '@angular/core';
import { ModalService } from 'src/app/services/modal.service';
import { ModalBodyDirective } from 'src/app/directives/modal-body.directive';
import { ModalBodyItem } from 'src/app/models/modalBodyItem';
import { ModalBodyComponent } from 'src/app/models/modalBodyComponent';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent implements OnInit, OnDestroy {
  modalConfig: any;
  @ViewChild(ModalBodyDirective, { static: true }) modalBody: ModalBodyDirective;
  @Input() modals: any;

  constructor(private modalService: ModalService, private componentFactoryResolver: ComponentFactoryResolver) { }

  ngOnInit() {
    this.modalService.displayModal.subscribe(modalConfig => this.modalConfig = modalConfig);
    this.loadComponent(this.modals[this.modalConfig.type]);
  }

  loadComponent(template: ModalBodyItem) {

    const componentFactory = this.componentFactoryResolver.resolveComponentFactory(template.component);

    const viewContainerRef = this.modalBody.viewContainerRef;
    viewContainerRef.clear();

    const componentRef = viewContainerRef.createComponent(componentFactory);
    (componentRef.instance as ModalBodyComponent).data = template.data;
  }

  ngOnDestroy() {
    const viewContainerRef = this.modalBody.viewContainerRef;
    viewContainerRef.clear();
  }
}
