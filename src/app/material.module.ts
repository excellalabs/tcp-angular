import {
  MatButtonModule,
  MatCheckboxModule,
  MatDatepickerModule,
  MatFormFieldModule,
  MatIconModule,
  MatInputModule,
  MatListModule,
  MatNativeDateModule,
  MatRadioModule,
  MatSelectModule,
  MatSidenavModule,
  MatStepperModule,
  MatToolbarModule
} from '@angular/material'

import { LayoutModule } from '@angular/cdk/layout'
import { NgModule } from '@angular/core'

const materialModules = [
  LayoutModule,
  MatButtonModule,
  MatCheckboxModule,
  MatDatepickerModule,
  MatFormFieldModule,
  MatIconModule,
  MatInputModule,
  MatListModule,
  MatNativeDateModule,
  MatToolbarModule,
  MatRadioModule,
  MatSelectModule,
  MatSidenavModule,
  MatStepperModule,
  MatButtonModule
]

@NgModule({
  imports: [materialModules],
  exports: [materialModules]
})
export class MaterialModule {}
