
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { ProductComponent } from './product.component';
import { AuthGuard } from '../core/_guards/auth.guard';

@NgModule({
  imports: [
    RouterModule.forChild([
      { path: 'produtos', component: ProductComponent, canActivate: [AuthGuard] }
    ])
  ]
})
export class ProductRoute { }
