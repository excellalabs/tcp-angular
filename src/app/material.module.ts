import { LayoutModule } from '@angular/cdk/layout'
import { NgModule } from '@angular/core'
  import { MatAutocompleteModule } from '@angular/material/autocomplete'

  import { MatButtonModule } from '@angular/material/button'

  import { MatCardModule } from '@angular/material/card'

  import { MatCheckboxModule } from '@angular/material/checkbox'

  import { MatChipsModule } from '@angular/material/chips'

  import { MatDatepickerModule } from '@angular/material/datepicker'

  import { MatDialogModule } from '@angular/material/dialog'

  import { MatFormFieldModule } from '@angular/material/form-field'

  import { MatIconModule } from '@angular/material/icon'

  import { MatInputModule } from '@angular/material/input'

  import { MatListModule } from '@angular/material/list'

  import { MatPaginatorModule } from '@angular/material/paginator'

  import { MatProgressSpinnerModule } from '@angular/material/progress-spinner'

  import { MatRadioModule } from '@angular/material/radio'

  import { MatSelectModule } from '@angular/material/select'

  import { MatSidenavModule } from '@angular/material/sidenav'

  import { MatSnackBarModule } from '@angular/material/snack-bar'

  import { MatSortModule } from '@angular/material/sort'

  import { MatStepperModule } from '@angular/material/stepper'

  import { MatTableModule } from '@angular/material/table'

  import { MatToolbarModule } from '@angular/material/toolbar'
import { MatNativeDateModule } from '@angular/material/core';


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
