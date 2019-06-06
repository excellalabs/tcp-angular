import { RouterModule, Routes } from '@angular/router';

import { AdminPanelComponent } from './admin-panel/admin-panel.component';
import { NgModule } from '@angular/core';

const routes: Routes = [
  { path: '**', component: AdminPanelComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
