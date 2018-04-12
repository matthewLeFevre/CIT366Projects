import { Component, OnInit, Input } from '@angular/core';

import { Message } from "../message.model";
import { Contact } from "../../contacts/contacts.model";
import { ContactService } from "../../contacts/contact.service";
@Component({
  selector: 'cms-message-item',
  templateUrl: './message-item.component.html',
  styleUrls: ['./message-item.component.css'],
})
export class MessageItemComponent implements OnInit {
  @Input() message: Message;
  messageSender:string = "Matthew LeFevre";
  constructor( private contactService: ContactService ) { }

  ngOnInit() {
    let contact: Contact = this.contactService.getContact(this.message.sender);
    if (!contact) {
      this.messageSender = "annonomous";
    } else {
      this.messageSender = contact.name;
    }
    
  }

}
