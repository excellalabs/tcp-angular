import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MaterialModule } from '../material.module';
import { PipeModule } from '../pipes/pipe.module';
import { AdminPanelComponent } from './admin-panel/admin-panel.component'
import { AdminRoutingModule } from './admin-routing.module';
import { ManageCategoriesComponent } from './manage-categories/manage-categories.component';
import { ManageSkillsComponent } from './manage-skills/manage-skills.component';
import { SkillFormComponent } from './manage-skills/skill-form/skill-form.component';

@NgModule({
  declarations: [AdminPanelComponent, ManageSkillsComponent, ManageCategoriesComponent, SkillFormComponent],
  imports: [CommonModule, AdminRoutingModule, FormsModule, ReactiveFormsModule, FlexLayoutModule, MaterialModule, PipeModule],
})
export class AdminModule {}
