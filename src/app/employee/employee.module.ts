import { CommonModule } from '@angular/common';
import { EmployeeFormComponent } from './employee-form/employee-form.component';
import { EmployeeListComponent } from './employee-list/employee-list.component';
import { EmployeeRoutingModule } from './employee-routing.module';
import { MaterialModule } from '../material.module';
import { NgModule } from '@angular/core';

@NgModule({
  declarations: [EmployeeFormComponent, EmployeeListComponent],
  imports: [
    CommonModule,
    EmployeeRoutingModule,
    MaterialModule
  ]
})
export class EmployeeModule { }
