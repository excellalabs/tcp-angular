import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { FlexLayoutModule } from '@angular/flex-layout'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'

import { MaterialModule } from '../material.module'
import { PipeModule } from '../pipes/pipe.module'
import { BioFormComponent } from './employee-form/bio-form/bio-form.component'
import { AddressFormComponent } from './employee-form/contact-form/address-form/address-form.component'
import { ContactFormComponent } from './employee-form/contact-form/contact-form.component'
import { EmployeeFormComponent } from './employee-form/employee-form.component'
import { ReviewComponent } from './employee-form/review/review.component'
import { SkillDetailComponent } from './employee-form/skills-form/skill-detail/skill-detail.component'
import { SkillsFormComponent } from './employee-form/skills-form/skills-form.component'
import { EmployeeListComponent } from './employee-list/employee-list.component'
import { EmployeeRoutingModule } from './employee-routing.module'
import { SelfServiceComponent } from './self-service/self-service.component'
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
    SkillDetailComponent,
    SelfServiceComponent,
  ],
  imports: [
    CommonModule,
    EmployeeRoutingModule,
    FlexLayoutModule,
    FormsModule,
    MaterialModule,
    PipeModule,
    ReactiveFormsModule,
  ],
  providers: [StateService],
})
export class EmployeeModule {}
