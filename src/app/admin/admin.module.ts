import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'

import { AdminPanelComponent } from './admin-panel/admin-panel.component'
import { AdminRoutingModule } from './admin-routing.module'

@NgModule({
  declarations: [AdminPanelComponent],
  imports: [CommonModule, AdminRoutingModule],
})
export class AdminModule {}
