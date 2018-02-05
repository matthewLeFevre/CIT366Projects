import { Component, OnInit, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'cms-header',
  templateUrl: './header.component.html'
})
export class HeaderComponent implements OnInit {
  @Output() selectedFeatureEvent= new EventEmitter<string>();
  constructor () {}
  ngOnInit () {}
  onSelected(selectedEvent: string) {
    this.selectedFeatureEvent.emit(selectedEvent);
  }
}
