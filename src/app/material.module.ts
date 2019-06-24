import { LayoutModule } from '@angular/cdk/layout'
import { NgModule } from '@angular/core'
import {
  MatAutocompleteModule,
  MatButtonModule,
  MatCardModule,
  MatCheckboxModule,
  MatChipsModule,
  MatDatepickerModule,
  MatDialogModule,
  MatFormFieldModule,
  MatIconModule,
  MatInputModule,
  MatListModule,
  MatNativeDateModule,
  MatPaginatorModule,
  MatProgressSpinnerModule,
  MatRadioModule,
  MatSelectModule,
  MatSidenavModule,
  MatSnackBarModule,
  MatSortModule,
  MatStepperModule,
  MatTableModule,
  MatToolbarModule,
} from '@angular/material'

const materialModules = [
  LayoutModule,
  MatAutocompleteModule,
  MatButtonModule,
  MatCardModule,
  MatCheckboxModule,
  MatChipsModule,
  MatDatepickerModule,
  MatDialogModule,
  MatFormFieldModule,
  MatIconModule,
  MatInputModule,
  MatListModule,
  MatNativeDateModule,
  MatToolbarModule,
  MatRadioModule,
  MatSelectModule,
  MatSidenavModule,
  MatSortModule,
  MatPaginatorModule,
  MatStepperModule,
  MatTableModule,
  MatToolbarModule,
  MatProgressSpinnerModule,
  MatSnackBarModule,
]

@NgModule({
  imports: [materialModules],
  exports: [materialModules],
})
export class MaterialModule {}
