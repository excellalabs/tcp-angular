import { RouterModule, Routes } from '@angular/router';

import { CommonModule } from '@angular/common';
import { ErrorComponent } from './error/error.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { NgModule } from '@angular/core';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'home', component: HomeComponent },
  { path: 'employee', loadChildren: () => import('./employee/employee.module').then(mod => mod.EmployeeModule) },
  { path: 'admin', loadChildren: () => import('./admin/admin.module').then(mod => mod.AdminModule) },
  { path: '', redirectTo: 'home', pathMatch: 'full'},
  { path: '**', component: ErrorComponent }
];

@NgModule({
  imports: [CommonModule, RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
