import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import {Document} from '../document.model';
@Component({
  selector: 'cms-document-list',
  templateUrl: './document-list.component.html',
  styleUrls: ['./document-list.component.css']
})
export class DocumentListComponent implements OnInit {
  @Output() selectedDocumentEvent = new EventEmitter<Document>();
  documents: Document[] = [ 
    new Document("1", "test doc 1", "test description for document", "../../test-doc-location", null),
    new Document("2", "test doc 2", "test description for document", "../../test-doc-location", null),
    new Document("3", "test doc 3", "test description for document", "../../test-doc-location", null),
    new Document("4", "test doc 4", "test description for document", "../../test-doc-location", null),
    new Document("5", "test doc 5", "test description for document", "../../test-doc-location", null),
  ];
  constructor() { }

  ngOnInit() {
  }

  onSelectedDocument (document: Document) {
    this.selectedDocumentEvent.emit(document);
  }

}
