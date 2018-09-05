import { NgModule } from '@angular/core';
import { CoreModule } from '../core/core.module';
import { ProductComponent } from './product.component';
import { ProductRoute } from './product.route';
import { ProductService } from './product.service';

@NgModule({
  imports: [
    CoreModule,
    ProductRoute
  ],
  declarations: [ProductComponent],
  providers: [
    ProductService
  ]
})
export class ProductModule { }
