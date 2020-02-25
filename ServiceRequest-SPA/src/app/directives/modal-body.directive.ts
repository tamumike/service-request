import { Directive, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[appModalBody]'
})
export class ModalBodyDirective {

  constructor(public viewContainerRef: ViewContainerRef) { }

}
