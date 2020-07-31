import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { GadgetTracerLogComponent } from 'projects/gadget-tracer-log/src/public-api';
import { SecurityAuthGuard } from './security/security.authguard';


const routes: Routes = [
  {
    path: 'gadget-tracer-log',
    component: GadgetTracerLogComponent,
    canActivate: [SecurityAuthGuard],

  },
  {
    path: '',
    redirectTo: 'gadget-tracer-log',
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
