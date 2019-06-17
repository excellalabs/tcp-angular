import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'

import { ManageCategoriesComponent } from './manage-categories/manage-categories.component'
import { ManageSkillsComponent } from './manage-skills/manage-skills.component'

const routes: Routes = [
  { path: 'skills', component: ManageSkillsComponent },
  { path: 'categories', component: ManageCategoriesComponent },
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule {}
