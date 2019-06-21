import { Injectable } from '@angular/core'
import { MatDialog } from '@angular/material'

import { ConfirmationDialogComponent } from '../../confirmation-dialog/confirmation-dialog.component'

export interface IConfirmation {
  title?: string
  message: string
  accept: () => any
  cancel: () => any
}

@Injectable()
export class DialogService {
  constructor(private matDialog: MatDialog) {}

  confirm(confirmation: IConfirmation): void {
    const dialogRef = this.matDialog.open(ConfirmationDialogComponent)
    dialogRef.afterClosed().subscribe((accepted: boolean) => {
      if (accepted) {
        confirmation.accept()
      } else {
        confirmation.cancel()
      }
    })
  }
}
