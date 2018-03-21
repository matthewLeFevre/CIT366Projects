import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';

import { Contact } from '../contacts.model';
import { ContactService } from '../contact.service';
@Component({
  selector: 'cms-contacts-list',
  templateUrl: './contacts-list.component.html',
  styleUrls: ['./contacts-list.component.css']
})
export class ContactsListComponent implements OnInit {
  subscription: Subscription;
  contacts: Contact[];
  constructor(private contactService: ContactService) { }

  ngOnInit() {
    this.contacts = this.contactService.getContacts();
    this.subscription = this.contactService.contactListChangedEvent.subscribe(
      (contactList: Contact[]) => {
        this.contacts = contactList;
      }
    );
  
  }

  ngOnDestroy () {
    this.subscription.unsubscribe();
  }

  onContactSelected (contact: Contact) {
    this.contactService.contactSelectedEvent.emit(contact);
  }
}
