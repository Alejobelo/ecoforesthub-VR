import { Component } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent {
  currentSection = 1;
  name = 'statistics';
  prev = 'Queries saved';

  changeSection(direction: number): void {
    this.currentSection += direction;

    if (this.currentSection < 1) {
      this.currentSection = 2;
    } else if (this.currentSection > 2) {
      this.currentSection = 1;
    }
  }
}
