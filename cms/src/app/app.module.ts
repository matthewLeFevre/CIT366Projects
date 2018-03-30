import { BrowserModule }  from '@angular/platform-browser';
import { NgModule }       from '@angular/core';
import { FormsModule }    from '@angular/forms';
import { HttpModule }     from '@angular/http';
import { DndModule }      from 'ng2-dnd';

import { AppComponent }             from './app.component';
import { HeaderComponent }          from './header.component';
import { ContactsComponent }        from './contacts/contacts.component';
import { ContactsListComponent }    from './contacts/contacts-list/contacts-list.component';
import { ContactsDetailComponent }  from './contacts/contacts-detail/contacts-detail.component';
import { ContactItemComponent }     from './contacts/contacts-list/contact-item/contact-item.component';
import { ContactEditComponent }     from './contacts/contact-edit/contact-edit.component';
import { DocumentsComponent }       from './documents/documents.component';
import { DocumentListComponent }    from './documents/document-list/document-list.component';
import { DocumentItemComponent }    from './documents/document-list/document-item/document-item.component';
import { DocumentDetailComponent }  from './documents/document-detail/document-detail.component';
import { DocumentsViewComponent }   from './documents/documents-view/documents-view.component';
import { DocumentEditComponent }    from './documents/document-edit/document-edit.component';
import { MessagesComponent }        from './messages/messages.component';
import { MessageItemComponent }     from './messages/message-item/message-item.component';
import { MessageEditComponent }     from './messages/message-edit/message-edit.component';
import { MessageListComponent }     from './messages/message-list/message-list.component';
import { DropdownDirective }        from './shared/dropdown.directive';
import { WinRefService }             from './win-ref.service';
import { MessageService }           from './messages/message.service';
import { ContactService }           from './contacts/contact.service';
import { DocumentService }          from './documents/document.service';
import { AppRoutingModule }         from './app-routing.module';
import { ContactsFilterPipe } from './contacts/contacts-filter.pipe';

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
    DropdownDirective,
    DocumentsViewComponent,
    DocumentEditComponent,
    ContactEditComponent,
    ContactsFilterPipe
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    DndModule.forRoot(),
    AppRoutingModule
  ],
  providers: [ContactService, MessageService, DocumentService, WinRefService],
  bootstrap: [AppComponent]
})
export class AppModule { }
