import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { BioFormComponent } from './employee-form/bio-form/bio-form.component';
import { CommonModule } from '@angular/common';
import { ContactFormComponent } from './employee-form/contact-form/contact-form.component';
import { EmployeeFormComponent } from './employee-form/employee-form.component';
import { EmployeeListComponent } from './employee-list/employee-list.component';
import { EmployeeRoutingModule } from './employee-routing.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MaterialModule } from '../material.module';
import { NgModule } from '@angular/core';
import { ReviewComponent } from './employee-form/review/review.component';
import { SkillsFormComponent } from './employee-form/skills-form/skills-form.component';

@NgModule({
  declarations: [
    BioFormComponent,
    ContactFormComponent,
    EmployeeFormComponent,
    EmployeeListComponent,
    ReviewComponent,
    SkillsFormComponent,
  ],
  imports: [
    CommonModule,
    EmployeeRoutingModule,
    FlexLayoutModule,
    FormsModule,
    MaterialModule,
    ReactiveFormsModule,
  ]
})
export class EmployeeModule { }
