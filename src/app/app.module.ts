import { CalculoDigitoService } from './calculoDigito/calculo-digito.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { CalculoDigitoComponent } from './calculoDigito/calculo-digito/calculo-digito.component';
import { HttpModule } from '@angular/http';




@NgModule({
  declarations: [
    AppComponent,
    CalculoDigitoComponent
  ],
  imports: [
    BrowserModule,
    HttpModule
  ],
  providers: [CalculoDigitoService],
  bootstrap: [AppComponent]
})
export class AppModule { }
