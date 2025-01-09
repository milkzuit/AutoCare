import { AfterViewInit, Component } from '@angular/core';
// as we import - SimpleBar - it gets bundled auto
import SimpleBar from 'simplebar';
// no need in angular.json - "node_modules/simplebar/dist/simplebar.min.js"

// but sidebar css does not get bundled automatically - so we have to say it to be bundled - angular.json
// "node_modules/simplebar/dist/simplebar.min.css"

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements AfterViewInit {

  ngAfterViewInit() {
    // Apply SimpleBar to the element after the view is initialized
    new SimpleBar(document.getElementById('body-wrapper')!);
  }

}
