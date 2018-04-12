import { Component, OnInit } from '@angular/core';
import { Router, Params, ActivatedRoute } from '@angular/router';
import { NgForm } from '@angular/forms';

import { Contact } from '../contacts.model';
import { ContactService } from '../contact.service';

@Component({
  selector: 'cms-contact-edit',
  templateUrl: './contact-edit.component.html',
  styleUrls: ['./contact-edit.component.css']
})
export class ContactEditComponent implements OnInit {
  contact: Contact = null;
  originalContact: Contact;
  invalidGroupContact: boolean;

  groupContacts: Contact[] = [];
  editMode: boolean = false;
  hasGroup: boolean = false;

  constructor( private contactService: ContactService,
               private router: Router,
               private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.params.subscribe(
      (params: Params) => {
        let id = params.id;
        if ( id === null ) {
          this.editMode = false;
          return;
        }

        this.originalContact = this.contactService.getContact(id);
        if (this.originalContact === null) {
          return;
        }

        this.editMode = true;
        this.contact = Object.assign({}, this.originalContact);
        if(this.contact.group !== null && this.contact.group !== undefined) {
          this.groupContacts = this.contact.group.slice();
        }
      }
    )
  }

  onSubmit(form:NgForm){
    let newContact = new Contact("", form.value.name, 
                                     form.value.email, 
                                     form.value.phone, 
                                     form.value.imageUrl, 
                                     form.value.group);
    if (this.editMode){
      this.contactService.updateContact(this.originalContact, newContact);
    } else {
      this.contactService.addContact(newContact);
    }

    this.router.navigate(['/contact']);
  }

  onCancel() {
    this.router.navigate(['/contact']);
  }

  isInvalidContact(newContact: Contact){
    if(!newContact) {
      return true;
    }
    if (newContact.id === this.contact.id) {

    }
     for (let i = 0; i < this.groupContacts.length; i++) {
       if (newContact.id === this.groupContacts[i].id) {
         return true;
       }
     }
     return false;
  }

  addToGroup($event: any){
    let selectedContact: Contact = $event.dragData;
    this.invalidGroupContact = this.isInvalidContact(selectedContact);
    if(this.invalidGroupContact){
      return;
    }
    this.groupContacts.push(selectedContact);
    this.invalidGroupContact = false;
  }

  onRemoveItem(idx: number){
    if(idx < 0 || idx >= this.groupContacts.length){
      return;
    }
    this.groupContacts.splice(idx, 1);
    this.invalidGroupContact = false;
  }

}
