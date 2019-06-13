import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'

import { AdminPanelComponent } from './admin-panel/admin-panel.component'
import { AdminRoutingModule } from './admin-routing.module';
import { ManageSkillsComponent } from './manage-skills/manage-skills.component';
import { ManageCategoriesComponent } from './manage-categories/manage-categories.component'

@NgModule({
  declarations: [AdminPanelComponent, ManageSkillsComponent, ManageCategoriesComponent],
  imports: [CommonModule, AdminRoutingModule],
})
export class AdminModule {}
