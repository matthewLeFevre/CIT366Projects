import { Injectable, EventEmitter, Input, Output } from '@angular/core';

import { Document } from './document.model';
import { MOCKDOCUMENTS } from './MOCKDOCUMENTS';
@Injectable()
export class DocumentService {
  documents: Document[] = [];
  documentSelectedEvent: EventEmitter<Document> = new EventEmitter();
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
}
