import { Injectable, EventEmitter, Input, Output } from '@angular/core';

import { Message } from './message.model';
import {MOCKMESSAGES} from './MOCKMESSAGES';
import { MOCKCONTACTS } from '../contacts/MOCKCONTACTS';
@Injectable()
export class MessageService {
  messages: Message[] = [];
  messageChangeEvent: EventEmitter<Message[]> = new EventEmitter();
  constructor() {
    this.messages = MOCKMESSAGES;
   }
  getMessages () {
    return this.messages.slice();
  }

  getMessage (id: string) {
    for (let m of this.messages) {
      if ( m.id === id) {
        return m;
      }
    }
    return null;
  }

  addMessage (message: Message) {
    this.messages.push(message);
    this.messageChangeEvent.emit(this.messages.slice());
  }
 }
