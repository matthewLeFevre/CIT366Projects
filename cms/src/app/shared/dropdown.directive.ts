import { Directive, HostListener, HostBinding } from "@angular/core";

@Directive({
  selector: '[cmsDropdown]'
})

export class DropdownDirective {
  @HostBinding('class.open') isOpen = false;
  @HostListener('click') toggleOpen(){
    var status = !this.isOpen;
    this.isOpen = status;
  }
}