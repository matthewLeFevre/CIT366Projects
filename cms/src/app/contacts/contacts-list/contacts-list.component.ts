import { Component, OnInit } from '@angular/core';

import { Contact } from '../contacts.model';
import { ContactService } from '../contact.service';
@Component({
  selector: 'cms-contacts-list',
  templateUrl: './contacts-list.component.html',
  styleUrls: ['./contacts-list.component.css']
})
export class ContactsListComponent implements OnInit {
  contacts: Contact[];
  constructor(private contactService: ContactService) { }

  ngOnInit() {
    this.contacts = this.contactService.getContacts();
  }

  onContactSelected (contact: Contact) {
    this.contactService.contactSelectedEvent.emit(contact);
  }
}
