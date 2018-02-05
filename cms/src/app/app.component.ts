import { Component } from '@angular/core';

@Component({
  selector: 'cms-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  feature: string = "documents";
  // selectedFeature: any;
  switchView(selectedFeature: string) {
    this.feature = selectedFeature;
  }
}
