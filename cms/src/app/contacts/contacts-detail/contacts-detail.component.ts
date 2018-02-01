import { Component, OnInit, Input, Output } from '@angular/core';

import{ Contact } from '../contacts.model';
@Component({
  selector: 'cms-contacts-detail',
  templateUrl: './contacts-detail.component.html',
  styleUrls: ['./contacts-detail.component.css']
})
export class ContactsDetailComponent implements OnInit {
  @Input() contact: Contact;
  constructor() { }

  ngOnInit() {
  }

}
