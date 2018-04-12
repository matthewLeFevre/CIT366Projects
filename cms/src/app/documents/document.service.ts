import { Injectable, EventEmitter, Input, Output } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { Headers, Http, Response } from '@angular/http';
import 'rxjs/Rx';

import { Document } from './document.model';
import { MOCKDOCUMENTS } from './MOCKDOCUMENTS';
@Injectable()
export class DocumentService {
  documents: Document[] = [];
  documentSelectedEvent: EventEmitter<Document> = new EventEmitter();
  documentChangeEvent: EventEmitter<Document[]> = new EventEmitter();
  documentListChangedEvent: Subject<Document[]> = new Subject();
  maxDocumentId: any;
  constructor(private http: Http) {
    // this.documents = MOCKDOCUMENTS;
    // this.maxDocumentId = this.getMaxId();
    this.initDocuments();
   }
   getDocuments() {
    return this.documents;
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

    this.http.delete('http://localhost:3000/documents/' + document.id)
      .map(
        (response: Response) => {
          return response.json().obj;
        }
      ).subscribe(
        (documents: Document[]) => {
          this.documents = documents;
          this.documentListChangedEvent.next(this.documents.slice())
        }
      )
   }

  addDocument(document: Document) {
    if (!document) {
      return;
    }

    const headers = new Headers({
      'Content-Type': 'application/json'
    });

    document.id="";
    const strDocument = JSON.stringify(document);

    this.http.post('http://localhost:3000/documents', strDocument, {headers: headers}).map (
      (response: Response) => {
        return response.json().obj;
      }
    ).subscribe(
      (documents: Document[]) => {
        this.documents = documents;
        this.documentListChangedEvent.next(this.documents.slice());
      }
    )
  }

  updateDocument(originalDocument: Document,
                 newDocument: Document) {
    if(originalDocument == undefined || newDocument == undefined) {
      return;
    }

    const pos = this.documents.indexOf(originalDocument);
    if(pos < 0 ) {
      return;
    }

    const headers = new Headers({
      'Content-Type': 'application/json'
    });

    const strDocument = JSON.stringify(newDocument);

    this.http.patch('http://localhost:3000/documents/' + originalDocument.id, strDocument, {headers: headers}).map (
      (response: Response) => {
        return response.json().obj;
      }
    ).subscribe(
      (documents: Document[]) => {
        this.documents = documents;
        this.documentListChangedEvent.next(this.documents);
      }
    )
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

  initDocuments() {
  this.http.get('http://localhost:3000/documents')
      .map(
        (response: Response) =>{
          const documents: Document[] = response.json().obj;
          console.log(response);
          return documents;
        }
      ) .subscribe(
        (documents : Document[]) => {
          this.documents = documents;
          console.log("===================================");
          console.log(this.documents);
          this.documentListChangedEvent.next(this.documents);
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
