import { Component, OnInit, Input, Output } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';

import{ Contact } from '../contacts.model';
import { ContactService } from '../contact.service';
@Component({
  selector: 'cms-contacts-detail',
  templateUrl: './contacts-detail.component.html',
  styleUrls: ['./contacts-detail.component.css']
})
export class ContactsDetailComponent implements OnInit {
  contact: Contact;
  id: string;
  constructor(private contactService: ContactService,
              private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.params
      .subscribe(
        (params:Params) => {
          this.id = params['id'];
          this.contact = this.contactService.getContact(this.id);
        }
      )
  }

  onDelete() {
    this.contactService.deleteContact(this.contact);
  }

}
