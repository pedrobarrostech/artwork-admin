import { NgModule } from '@angular/core';
import { CoreModule } from '../core/core.module';
import { MessageComponent } from './message.component';
import { MessageRoute } from './message.route';
import { MessageService } from './message.service';
@NgModule({
  imports: [
    CoreModule,
    MessageRoute
  ],
  declarations: [MessageComponent],
  providers: [MessageService]
})
export class MessageModule { }
