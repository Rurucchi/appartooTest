import { Directive, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[fdHost]',
})
export class friendDirective {
  constructor(public viewContainerRef: ViewContainerRef) {}
}
