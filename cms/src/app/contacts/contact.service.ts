import { Injectable, EventEmitter, Input, Output } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { Headers, Http, Response, Jsonp} from '@angular/http';
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
     return this.contacts;
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

    this.http.delete('http://localhost:3000/contact/' + contact.id)
      .map(
        (response: Response) => {
          return response.json().obj;
        }
      ).subscribe(
        (contacts: Contact[]) => {
          this.contacts = contacts;
          this.contactsChangeEvent.next(this.contacts);
        }
      )
   }

   addContact( contact: Contact){
     if (contact === null) {
       return;
     }

     const headers = new Headers({ 'content-Type': 'application/json'});
     contact.id="";
     const strContact = JSON.stringify(contact);

     this.http.post('http://localhost:3000/contact', strContact, {headers: headers})
      .map(
        (response: Response) => {
          return response.json().obj;
        }
      ).subscribe(
        (contacts: Contact[]) => {
          this.contacts = contacts;
          this.contactsChangeEvent.next(this.contacts);
        }
      )

   }

   updateContact (originalContact: Contact,
                  newContact: Contact) {
      if( originalContact === null || newContact === null){
        return;
      }

      const pos = this.contacts.indexOf(originalContact);
      if(pos < 0) {
        return;
      }
      const headers = new Headers({ 'content-Type': 'application/json'});

     
     const strContact = JSON.stringify(newContact);

     this.http.patch('http://localhost:3000/contact/' + originalContact.id, strContact, {headers: headers})
      .map(
        (response: Response) => {
          return response.json().obj;
        }
      ).subscribe(
        (contacts: Contact[]) => {
          this.contacts = contacts;
          this.contactsChangeEvent.next(this.contacts);
        }
      )
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
    this.http.get('http://localhost:3000/contact')
      .map(
        (respons: Response) => {
          const contacts: Contact[] = respons.json().obj;
          console.log(contacts);
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

  storeContacts() {
    let contactsClone = JSON.stringify(this.contacts);
    const headers = new Headers({'Content-Type': 'application/json'});
    return this.http.put('https://cms-cit360.firebaseio.com/contacts.json',
      contactsClone,
      {headers: headers});
  }
}
