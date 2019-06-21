import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'

import { SnackBarService } from './services/snack-bar/snack-bar.service'

@NgModule({
  declarations: [],
  imports: [CommonModule],
  providers: [SnackBarService],
})
export class MessagingModule {}
