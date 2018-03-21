import { Component, OnInit, EventEmitter, Output, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Subscription'

import { DocumentService } from '../document.service';
import {Document} from '../document.model';
@Component({
  selector: 'cms-document-list',
  templateUrl: './document-list.component.html',
  styleUrls: ['./document-list.component.css']
})
export class DocumentListComponent implements OnInit {
  documents: Document[] = [];
  subscription: Subscription;
  constructor(private documentService: DocumentService) { 
    this.documents = documentService.getDocuments();
  }

  ngOnInit() {

    this.documentService.documentChangeEvent.subscribe(
      (documents: Document[]) => {
        this.documents = documents;
      }
    )

    this.subscription = this.documentService.documentListChangedEvent.subscribe(
      (documentList: Document[]) => {
        this.documents = documentList;
      }
    );
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
