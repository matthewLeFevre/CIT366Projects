import { Injectable, EventEmitter, Input, Output } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { Headers, Http, Response} from '@angular/http';
import 'rxjs/Rx';

import { Contact } from './contacts.model';
import {MOCKCONTACTS} from './MOCKCONTACTS';
@Injectable()
export class ContactService {
  contacts: Contact[] = [];
  contactSelectedEvent: EventEmitter<Contact> = new EventEmitter();
  contactsChangeEvent: EventEmitter<Contact[]> = new EventEmitter();
  contactListChangedEvent: Subject<Contact[]> = new Subject();
  maxContactId: any;
  constructor( private http: Http) {
    this.initContacts();
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
     let contactListClone = this.contacts.slice();
    //  this.contactListChangedEvent.next(contactListClone);
    this.storeContacts(contactListClone);
   }

   addContact( newContact: Contact){
     if (newContact === null) {
       return;
     }

     this.maxContactId++;
     newContact.id = this.maxContactId + "";
     this.contacts.push(newContact);
     let contactListClone = this.contacts.slice();
    //  this.contactListChangedEvent.next(contactListClone);
     this.storeContacts(contactListClone);
   }

   updateContact (originalContact: Contact,
                  newContact: Contact) {
      if( originalContact === null || newContact === null){
        return;
      }

      let pos = this.contacts.indexOf(originalContact);
      if(pos < 0) {
        return;
      }
      newContact.id = originalContact.id;
      this.contacts[pos] = newContact;
      let contactListClone = this.contacts.slice();
      // this.contactListChangedEvent.next(contactListClone);
      this.storeContacts(contactListClone);
   }

   getMaxId() {
    var maxId = 0;
    for (let contact of this.contacts) {
      let currentId = +contact.id;
      if ( currentId > maxId) {
        maxId = currentId;
      }
    }

    return maxId;
  }

  initContacts() {
    this.http.get('https://cms-cit360.firebaseio.com/contacts.json')
      .map(
        (respons: Response) => {
          const contacts: Contact[] = respons.json();
          return contacts;
        }
      ) . subscribe (
        (contacts: Contact[]) => {
          this.contacts = contacts;
          this.maxContactId = this.getMaxId();
          this.contactListChangedEvent.next(this.contacts.slice());
        }
      )
  }

  storeContacts( contacts: Contact[]) {
    let contactsClone = JSON.stringify(contacts);
    const headers = new Headers({'Content-Type': 'application/json'});
    return this.http.put('https://cms-cit360.firebaseio.com/contacts.json',
      contactsClone,
      {headers: headers});
  }
}
