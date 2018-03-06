import { Component, OnInit, EventEmitter, Output } from '@angular/core';

import { DocumentService } from '../document.service';
import {Document} from '../document.model';
@Component({
  selector: 'cms-document-list',
  templateUrl: './document-list.component.html',
  styleUrls: ['./document-list.component.css']
})
export class DocumentListComponent implements OnInit {
  documents: Document[] = [];
  constructor(private documentService: DocumentService) { 
    this.documents = documentService.getDocuments();
  }

  ngOnInit() {
    this.documentService.documentChangeEvent.subscribe(
      (documents: Document[]) => {
        this.documents = documents;
      }
    )
  }

}
