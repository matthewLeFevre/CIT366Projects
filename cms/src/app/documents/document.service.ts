import { Injectable, EventEmitter, Input, Output } from '@angular/core';
import { Subject } from 'rxjs/Subject';

import { Document } from './document.model';
import { MOCKDOCUMENTS } from './MOCKDOCUMENTS';
@Injectable()
export class DocumentService {
  documents: Document[] = [];
  documentSelectedEvent: EventEmitter<Document> = new EventEmitter();
  documentChangeEvent: EventEmitter<Document[]> = new EventEmitter();
  documentListChangedEvent: Subject<Document[]> = new Subject();
  maxDocumentId: any;
  constructor() {
    this.documents = MOCKDOCUMENTS;
    this.maxDocumentId = this.getMaxId();
   }
   getDocuments() {
    return this.documents.slice();
   }
   getDocument (id: string) {
    for (let d of this.documents) {
      if (d.id === id) {
        return d;
      }
     }
     return null;
   }
   deleteDocument (document: Document) {
    if (document === null) {
      return;
    }

    const pos = this.documents.indexOf(document);
    if (pos < 0) {
      return;
    }

    this.documents.splice(pos, 1);
    let documentsListClone = this.documents.slice();
    this.documentListChangedEvent.next(documentsListClone);
   }

  addDocument(newDocument: Document) {
    if (newDocument === null) {
      console.log("was null");
      return;
    }

    this.maxDocumentId++;
    newDocument.id = this.maxDocumentId;
    this.documents.push(newDocument);
    let documentListClone = this.documents.slice();
    console.log(documentListClone);
    this.documentListChangedEvent.next(documentListClone);
  }

  updateDocument(originalDocument: Document,
                 newDocument: Document) {
    if(originalDocument == undefined || newDocument == undefined) {
      return;
    }

    let pos = this.documents.indexOf(originalDocument);
    if(pos < 0 ) {
      return;
    }

    newDocument.id = originalDocument.id;
    this.documents[pos] = newDocument;
    let documentListClone = this.documents.slice();
    this.documentListChangedEvent.next(documentListClone);
  }

  getMaxId() {
    var maxId = 0;
    for (let document of this.documents) {
      let currentId = +document.id;
      if ( currentId > maxId) {
        maxId = currentId;
      }
    }

    return maxId;
  }

}
