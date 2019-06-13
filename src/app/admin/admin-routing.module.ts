import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'

import { AdminPanelComponent } from './admin-panel/admin-panel.component'
import { ManageCategoriesComponent } from './manage-categories/manage-categories.component';
import { ManageSkillsComponent } from './manage-skills/manage-skills.component';

const routes: Routes = [
  { path: 'skills', component: ManageSkillsComponent },
  { path: 'categories', component: ManageCategoriesComponent },
  { path: '**', component: AdminPanelComponent }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule {}
