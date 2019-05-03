import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';

import { PitchPlayerCardModule } from 'src';

import {AngularFittextModule} from "angular-fittext";

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    PitchPlayerCardModule,
    AngularFittextModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
