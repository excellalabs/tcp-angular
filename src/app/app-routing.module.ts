import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'

import { AuthGuard } from './auth/auth.guard'
import { ErrorComponent } from './error/error.component'
import { HomeComponent } from './home/home.component'
import { LoginComponent } from './login/login.component'
import { Role } from './models/role'
import { EmployeesService } from './services/employees/employees.service';
import { SkillCategoriesService } from './services/skill-categories/skill-categories.service';
import { SkillsService } from './services/skills/skills.service';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'home',
    component: HomeComponent,
    canActivate: [AuthGuard],
    resolve: {skills: SkillsService, categories: SkillCategoriesService} },
  {
    path: 'employee',
    loadChildren: () =>
      import('./employee/employee.module').then(mod => mod.EmployeeModule),
    canActivate: [AuthGuard],
    resolve: {skills: SkillsService, categories: SkillCategoriesService, employees: EmployeesService}
  },
  {
    path: 'admin',
    loadChildren: () => import('./admin/admin.module').then(mod => mod.AdminModule),
    canActivate: [AuthGuard],
    data: { roles: [Role.admin] },
    resolve: {skills: SkillsService, categories: SkillCategoriesService}
  },
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: '**', component: ErrorComponent },
]

@NgModule({
  imports: [CommonModule, RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [SkillsService]
})
export class AppRoutingModule {}
