import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'

import { ErrorComponent } from '../error/error.component';
import { ManageCategoriesComponent } from './manage-categories/manage-categories.component'
import { ManageSkillsComponent } from './manage-skills/manage-skills.component'

const routes: Routes = [
  { path: 'skills', component: ManageSkillsComponent },
  { path: 'categories', component: ManageCategoriesComponent },
  { path: '**', component: ErrorComponent },
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule {}
