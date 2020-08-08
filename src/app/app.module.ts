import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { GadgetTracerLogModule } from 'projects/gadget-tracer-log/src/public-api';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import {MatToolbarModule,MatButtonModule,MatIconModule} from '@angular/material';
import { TestComponent } from './test/test.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    TestComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    GadgetTracerLogModule,MatToolbarModule,MatButtonModule,MatIconModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
