import { RouterModule, Routes } from '@angular/router';

import { AdminPanelComponent } from './admin-panel/admin-panel.component';
import { CommonModule } from '@angular/common';
import { DataDisplayComponent } from './data-display/data-display.component';
import { EmployeeFormComponent } from './employee-form/employee-form.component';
import { ErrorComponent } from './error/error.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { NgModule } from '@angular/core';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'home', component: HomeComponent },
  { path: 'employee-form', component: EmployeeFormComponent },
  { path: 'data-display', component: DataDisplayComponent },
  { path: 'admin-panel', component: AdminPanelComponent },
  { path: '**', component: ErrorComponent }
];

@NgModule({
  imports: [CommonModule, RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
