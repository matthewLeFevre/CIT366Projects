import { Injectable, EventEmitter, Input, Output } from '@angular/core';
import { Subject } from 'rxjs/subject';
import 'rxjs/Rx';
import { Headers, Http, Response} from '@angular/http';

import { Message } from './message.model';
import {MOCKMESSAGES} from './MOCKMESSAGES';
import { MOCKCONTACTS } from '../contacts/MOCKCONTACTS';
@Injectable()
export class MessageService {
  messages: Message[] = [];
  maxMessageId: number = this.generateId(66);
  messageChangeEvent: EventEmitter<Message[]> = new EventEmitter();
  constructor(private http: Http) {
    this.messages = MOCKMESSAGES;
   }
  generateId (length: number) {
    let password = "";
    for(let i = 0; i < length; i++) {
      password += Math.floor((Math.random() * 9));
    }
    return +password;
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

  initDocuments() {
    this.http.get('https://cms-cit360.firebaseio.com/documents.json')
        .map(
          (response: Response) =>{
            const messages: Message[] = response.json();
            console.log(response);
            return messages;
          }
        ) .subscribe(
          (messages : Message[]) => {
            this.messages = messages;
            this.maxMessageId = this.generateId(66);
            this.messageChangeEvent.next(this.messages.slice());
          }
        );
    }
  
    storeDocuments( documents: Document[]) {
      console.log(documents);
      let documentsClone = JSON.stringify(documents);
      const headers= new Headers({'Content-Type': 'application/json'});
      return this.http.put('https://cms-cit360.firebaseio.com/documents.json', 
        documentsClone, {headers: headers});
    }  
 }
