import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { SectionsComponent } from './components/sections/sections.component';
import { BarchartComponent } from './components/barchart/barchart/barchart.component';
import { NgChartsModule } from 'ng2-charts';

@NgModule({
  declarations: [DashboardComponent, SectionsComponent, BarchartComponent],
  imports: [CommonModule, DashboardRoutingModule, NgChartsModule],
})
export class DashboardModule {}
