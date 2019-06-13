import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'

import { EmployeeFormComponent } from './employee-form/employee-form.component'
import { EmployeeListComponent } from './employee-list/employee-list.component'
import { SelfServiceComponent } from './self-service/self-service.component';

const routes: Routes = [
  { path: 'add', component: EmployeeFormComponent },
  { path: 'self', component: SelfServiceComponent },
  { path: 'edit/:id', component: EmployeeFormComponent },
  { path: 'list', component: EmployeeListComponent },
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EmployeeRoutingModule {}
