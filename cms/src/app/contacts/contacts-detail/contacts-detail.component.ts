import { Component, OnInit } from '@angular/core';

import{ Contacts } from '../contacts.model';
@Component({
  selector: 'cms-contacts-detail',
  templateUrl: './contacts-detail.component.html',
  styleUrls: ['./contacts-detail.component.css']
})
export class ContactsDetailComponent implements OnInit {
  public Contact: Contacts
  constructor() { }

  ngOnInit() {
  }

}
