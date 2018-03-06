import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';

import { Document } from "../document.model";
import { DocumentService } from '../document.service';
import { WinRefService } from '../../win-ref.service';
@Component({
  selector: 'cms-document-detail',
  templateUrl: './document-detail.component.html',
  styleUrls: ['./document-detail.component.css']
})
export class DocumentDetailComponent implements OnInit {
  document: Document;
  nativeWindow: any;
  id: string;
  @Input() index: string;
  edit: string;
  constructor(private documentService: DocumentService, 
              private route: ActivatedRoute,
              private winref: WinRefService) {
                this.nativeWindow = winref.getNativeWindow();
               }

  ngOnInit() {
    this.route.params 
      .subscribe (
        (params: Params) => {
          this.id = params['id'];
          this.document = this.documentService.getDocument(this.id);
        }
      );
  }

  onView() {
    if (this.document.url) {
      this.nativeWindow.open(this.document.url);
    }
  }

  onDelete() {
    this.documentService.deleteDocument(this.document);
  }
 
}
