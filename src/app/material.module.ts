import { MatButtonModule, MatIconModule, MatListModule, MatSidenavModule, MatStepperModule, MatToolbarModule } from '@angular/material';

import { LayoutModule } from '@angular/cdk/layout';
import { NgModule } from '@angular/core';

const materialModules = [
  LayoutModule,
  MatToolbarModule,
  MatButtonModule,
  MatSidenavModule,
  MatIconModule,
  MatListModule,
  MatStepperModule
];

@NgModule({
  imports: [materialModules],
  exports: [materialModules]
})
export class MaterialModule {}
