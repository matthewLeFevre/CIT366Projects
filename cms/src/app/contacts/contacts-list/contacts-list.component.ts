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
  term: string;
  constructor(private contactService: ContactService) { }

  ngOnInit() {

    this.contactService.contactsChangeEvent.subscribe(
      (contacts: Contact[]) => {
        this.contacts = contacts;
      }
    )
    // this.contacts = this.contactService.Contacts();
    this.subscription = this.contactService.contactListChangedEvent.subscribe(
      (contactList: Contact[]) => {
        this.contacts = contactList;
        console.log(this.contacts);
      }
    );
   
  }

  ngOnDestroy () {
    this.subscription.unsubscribe();
  }

  onContactSelected (contact: Contact) {
    this.contactService.contactSelectedEvent.emit(contact);
  }
  
  onKeyPress(value: string) {
    this.term = value;
  }
}
