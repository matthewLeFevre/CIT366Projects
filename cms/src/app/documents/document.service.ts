import { Injectable, EventEmitter, Input, Output } from '@angular/core';

import { Document } from './document.model';
import { MOCKDOCUMENTS } from './MOCKDOCUMENTS';
@Injectable()
export class DocumentService {
  documents: Document[] = [];
  documentSelectedEvent: EventEmitter<Document> = new EventEmitter();
  documentChangeEvent: EventEmitter<Document[]> = new EventEmitter();
  constructor() {
    this.documents = MOCKDOCUMENTS;
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
    this.documentChangeEvent.emit(this.documents.slice());
   }
}
