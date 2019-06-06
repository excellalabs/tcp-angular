import { MatButtonModule, MatIconModule, MatListModule, MatSidenavModule, MatToolbarModule } from '@angular/material';

import { LayoutModule } from '@angular/cdk/layout';
import { NgModule } from '@angular/core';

const materialModules = [LayoutModule, MatToolbarModule, MatButtonModule, MatSidenavModule, MatIconModule, MatListModule];

@NgModule({
  imports: [materialModules],
  exports: [materialModules]
})
export class MaterialModule {}
