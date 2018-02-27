import { Component, OnInit, EventEmitter, ViewChild, ElementRef, Output } from '@angular/core';

import { Message } from '../message.model';
import { MessageService} from '../message.service';
@Component({
  selector: 'cms-message-edit',
  templateUrl: './message-edit.component.html',
  styleUrls: ['./message-edit.component.css']
})
export class MessageEditComponent implements OnInit {
  currentSender: string = '2';
  @ViewChild('subject') subject: ElementRef;
  @ViewChild('msgText') msgText: ElementRef;
  @Output() addMessageEvent = new EventEmitter<Message>();
  constructor(private messageService: MessageService) { }

  ngOnInit() {
  }

  onSendMessage () {
    let subject = this.subject;
    let currentSender = this.currentSender;
    let msgText = this.msgText;
    let newMessage = new Message( this.messageService.messages.length + 1 + "", subject.nativeElement.value, msgText.nativeElement.value, this.currentSender);
    this.addMessageEvent.emit(newMessage);
    this.onClear();
    this.messageService.addMessage(newMessage);
  }

  onClear() {
    this.subject.nativeElement.value = "";
    this.msgText.nativeElement.value = "";
  }
}
