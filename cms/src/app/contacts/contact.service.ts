import { Injectable, EventEmitter, Input, Output } from '@angular/core';

import { Contact } from './contacts.model';
import {MOCKCONTACTS} from './MOCKCONTACTS';
@Injectable()
export class ContactService {
  contacts: Contact[] = [];
  contactSelectedEvent: EventEmitter<Contact> = new EventEmitter();
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

}
