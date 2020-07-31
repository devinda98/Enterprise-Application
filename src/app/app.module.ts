import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { SecurityModule } from '../app/security/security.module';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { GadgetTracerLogModule } from 'projects/gadget-tracer-log/src/public-api';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    GadgetTracerLogModule,
    SecurityModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
