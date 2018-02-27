import { BrowserModule }  from '@angular/platform-browser';
import { NgModule }       from '@angular/core';
import { FormsModule }    from '@angular/forms';
import { HttpModule }     from '@angular/http';

import { AppComponent }             from './app.component';
import { HeaderComponent }          from './header.component';
import { ContactsComponent }        from './contacts/contacts.component';
import { ContactsListComponent }    from './contacts/contacts-list/contacts-list.component';
import { ContactsDetailComponent }  from './contacts/contacts-detail/contacts-detail.component';
import { ContactItemComponent }     from './contacts/contacts-list/contact-item/contact-item.component';
import { DocumentsComponent }       from './documents/documents.component';
import { DocumentListComponent }    from './documents/document-list/document-list.component';
import { DocumentItemComponent }    from './documents/document-list/document-item/document-item.component';
import { DocumentDetailComponent }  from './documents/document-detail/document-detail.component';
import { MessagesComponent }        from './messages/messages.component';
import { MessageItemComponent }     from './messages/message-item/message-item.component';
import { MessageEditComponent }     from './messages/message-edit/message-edit.component';
import { MessageListComponent }     from './messages/message-list/message-list.component';
import { DropdownDirective }        from './shared/dropdown.directive';
import { MessageService }           from './messages/message.service';
import { ContactService }          from './contacts/contact.service';
import { DocumentService }         from './documents/document.service';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    ContactsComponent,
    ContactsListComponent,
    ContactsDetailComponent,
    ContactItemComponent,
    DocumentsComponent,
    DocumentListComponent,
    DocumentItemComponent,
    DocumentDetailComponent,
    MessagesComponent,
    MessageItemComponent,
    MessageEditComponent,
    MessageListComponent,
    DropdownDirective
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule
  ],
  providers: [ContactService, MessageService, DocumentService],
  bootstrap: [AppComponent]
})
export class AppModule { }
