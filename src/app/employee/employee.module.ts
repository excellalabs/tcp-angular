import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule, MatCardModule, MatInputModule, MatRadioModule, MatSelectModule } from '@angular/material';

import { AddressFormComponent } from './employee-form/contact-form/address-form/address-form.component';
import { BioFormComponent } from './employee-form/bio-form/bio-form.component';
import { CommonModule } from '@angular/common';
import { ContactFormComponent } from './employee-form/contact-form/contact-form.component';
import { EmployeeFormComponent } from './employee-form/employee-form.component';
import { EmployeeListComponent } from './employee-list/employee-list.component';
import { EmployeeRoutingModule } from './employee-routing.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MaterialModule } from '../material.module';
import { NgModule } from '@angular/core';
import { PipeModule } from '../pipes/pipe.module';
import { ReviewComponent } from './employee-form/review/review.component';
import { SkillsFormComponent } from './employee-form/skills-form/skills-form.component';
import { StateService } from './services/state/state.service';

@NgModule({
  declarations: [
    BioFormComponent,
    ContactFormComponent,
    EmployeeFormComponent,
    EmployeeListComponent,
    ReviewComponent,
    SkillsFormComponent,
    AddressFormComponent,
  ],
  imports: [
    CommonModule,
    EmployeeRoutingModule,
    FlexLayoutModule,
    FormsModule,
    MaterialModule,
    PipeModule,
    ReactiveFormsModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    MatRadioModule,
    MatCardModule
  ],
  providers: [StateService]
})
export class EmployeeModule { }
