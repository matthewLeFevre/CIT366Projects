import { Injectable, EventEmitter, Input, Output } from '@angular/core';

import { Contact } from './contacts.model';
import {MOCKCONTACTS} from './MOCKCONTACTS';
@Injectable()
export class ContactService {
  contacts: Contact[] = [];
  contactSelectedEvent: EventEmitter<Contact> = new EventEmitter();
  contactsChangeEvent: EventEmitter<Contact[]> = new EventEmitter();
  constructor() {
    this.contacts = MOCKCONTACTS;
   }

   getContacts() {
     return this.contacts.slice();
   }

   getContact(id: string) {
     for (let c of this.contacts) {
      if (c.id === id) {
        return c;
      }
     }
     return null;
   }

   deleteContact(contact: Contact) {
     if (contact === null) {
       return;
     }

     const pos = this.contacts.indexOf(contact);
     if (pos < 0) {
       return;
     }

     this.contacts.splice(pos, 1);
     this.contactsChangeEvent.emit(this.contacts.slice());
   }

}
