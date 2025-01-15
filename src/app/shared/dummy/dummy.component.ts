import { Component } from '@angular/core';

@Component({
  selector: 'app-dummy',
  templateUrl: './dummy.component.html',
  styleUrl: './dummy.component.css',
})
export class DummyComponent {

  // Array to store the state of each star (0 = empty, 1 = half, 2 = full)
  stars: number[] = [0, 0, 0, 0, 0];

  // Function to handle rating click
  rate(index: number): void {
    // Toggle star state (empty -> half -> full -> empty)
    if (this.stars[index] === 0) {
      this.stars[index] = 1; // Half star
    } else if (this.stars[index] === 1) {
      this.stars[index] = 2; // Full star
    } else {
      this.stars[index] = 0; // Empty star
    }
  }
}
