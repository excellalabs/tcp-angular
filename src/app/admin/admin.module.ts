import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { FlexLayoutModule } from '@angular/flex-layout'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'

import { MaterialModule } from '../material.module'
import { PipeModule } from '../pipes/pipe.module'
import { AdminPanelComponent } from './admin-panel/admin-panel.component'
import { AdminRoutingModule } from './admin-routing.module'
import { CategoryFormComponent } from './manage-categories/category-form/category-form.component'
import { CategoryListComponent } from './manage-categories/category-list/category-list.component';
import { ManageCategoriesComponent } from './manage-categories/manage-categories.component'
import { ManageSkillsComponent } from './manage-skills/manage-skills.component'
import { SkillFormComponent } from './manage-skills/skill-form/skill-form.component'
import { SkillListComponent } from './manage-skills/skill-list/skill-list.component';

@NgModule({
  declarations: [
    AdminPanelComponent,
    ManageSkillsComponent,
    ManageCategoriesComponent,
    SkillFormComponent,
    SkillListComponent,
    CategoryListComponent,
    CategoryFormComponent,
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    MaterialModule,
    PipeModule,
  ],
})
export class AdminModule {}
