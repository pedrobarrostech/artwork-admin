import { NgModule } from '@angular/core';
import { CoreModule } from '../core/core.module';
import { SectionComponent } from './section.component';
import { SectionRoute } from './section.route';
import { SectionService } from './section.service';

@NgModule({
  imports: [
    CoreModule,
    SectionRoute
  ],
  declarations: [SectionComponent],
  providers: [
    SectionService
  ]
})
export class SectionModule { }
