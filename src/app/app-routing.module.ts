import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { GadgetTracerLogComponent } from 'projects/gadget-tracer-log/src/public-api';
import { TestComponent } from './test/test.component';
import { CheckoutComponent } from '../../projects/gadget-tracer-log/src/lib/checkout/checkout.component';
import { QuantityManagerComponent } from 'projects/gadget-tracer-log/src/lib/quantity-manager/quantity-manager.component';

const routes: Routes = [
  {
    path: 'gadget-tracer-log',
    component: GadgetTracerLogComponent,

  },
  {
    path: 'search',
    component: GadgetTracerLogComponent,

  },
  {
    path: 'checkout',
    component: CheckoutComponent,

  },
  {
    path: 'quantity',
    component: QuantityManagerComponent,

  },
  {path:'test',component:TestComponent},
  {
    path: '',
    redirectTo: 'test',
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
