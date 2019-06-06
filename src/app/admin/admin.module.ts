import { AdminPanelComponent } from './admin-panel/admin-panel.component';
import { AdminRoutingModule } from './admin-routing.module';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

@NgModule({
  declarations: [AdminPanelComponent],
  imports: [
    CommonModule,
    AdminRoutingModule
  ]
})
export class AdminModule { }
