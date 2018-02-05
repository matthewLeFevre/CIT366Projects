import { Component, OnInit, EventEmitter, ViewChild, ElementRef, Output } from '@angular/core';
import { Message } from '../message.model';
@Component({
  selector: 'cms-message-edit',
  templateUrl: './message-edit.component.html',
  styleUrls: ['./message-edit.component.css']
})
export class MessageEditComponent implements OnInit {
  currentSender: string = "Matthew LeFevre";
  @ViewChild('subject') subject: ElementRef;
  @ViewChild('msgText') msgText: ElementRef;
  @Output() addMessageEvent = new EventEmitter<Message>();
  constructor() { }

  ngOnInit() {
  }

  onSendMessage () {
    let subject = this.subject;
    let currentSender = this.currentSender;
    let msgText = this.msgText;
    let newMessage = new Message( '4', subject.nativeElement.value, msgText.nativeElement.value, currentSender);
    this.addMessageEvent.emit(newMessage);
    this.onClear();
  }

  onClear() {
    this.subject.nativeElement.value = "";
    this.msgText.nativeElement.value = "";
  }
}
