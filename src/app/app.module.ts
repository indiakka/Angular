import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MaterialModule } from './material/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MAT_DATE_LOCALE } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatMomentDateModule } from '@angular/material-moment-adapter';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { AgendaComponent } from './agenda/agenda.component';
import { PersonaComponent } from './agenda/persona/persona.component';

@NgModule({
  declarations: [AppComponent, AgendaComponent, PersonaComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    MatDatepickerModule,
    MatMomentDateModule,
    HttpClientModule,
  ],
  providers: [{ provide: MAT_DATE_LOCALE, useValue: 'es-ES' }],

  bootstrap: [AppComponent],
})
export class AppModule {}
