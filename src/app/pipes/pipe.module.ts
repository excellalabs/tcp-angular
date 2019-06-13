import { NgModule } from '@angular/core'

import { RequiredMessagePipe } from './required-message/required-message.pipe'

const pipes = [RequiredMessagePipe]

@NgModule({
  declarations: [pipes],
  providers: [pipes],
  exports: [pipes],
})
export class PipeModule {}
