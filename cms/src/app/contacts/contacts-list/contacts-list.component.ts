import { Component, OnInit } from '@angular/core';

import { Contact } from '../contacts.model';
@Component({
  selector: 'cms-contacts-list',
  templateUrl: './contacts-list.component.html',
  styleUrls: ['./contacts-list.component.css']
})
export class ContactsListComponent implements OnInit {
  contacts: Contact[] = [
    new Contact("1", "Matthew LeFevre", "matthew@lefevre.com", "541-714-3099", "https://images.unsplash.com/photo-1499996860823-5214fcc65f8f?auto=format&fit=crop&w=702&q=80",null),
    new Contact("2", "Bro. Jackson", "jacksonk@byui.edu", "208-496-3771", "https://web.byui.edu/Directory/Employee/jacksonk.jpg", null)
  ];
  constructor() { }

  ngOnInit() {
  }

}
