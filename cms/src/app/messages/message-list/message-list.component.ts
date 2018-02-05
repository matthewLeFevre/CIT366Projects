import { Component, OnInit, Input } from '@angular/core';

import { Message } from '../message.model';

@Component({
  selector: 'cms-message-list',
  templateUrl: './message-list.component.html',
  styleUrls: ['./message-list.component.css']
})
export class MessageListComponent implements OnInit {
  messages: Message[] = [
    new Message( '6', "Super Bowl", "I am so happy the eagles won", "Jack" ),
    new Message( '6', "Super Bowl", "Yeah I think they have a Mormon Coach?" ,"Jill" ),
    new Message( '6', "Super Bowl", "I don't know if they do but they are a great team", "Jack" )
  ];
  constructor() { }

  ngOnInit() {
  }

  onAddMessage(message: Message) {
    this.messages.push(message);
  }

}
