import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { DragDropDirectiveModule } from 'angular4-drag-drop';
import { AgmCoreModule } from '@agm/core';


import { AppComponent } from './app.component';
import { MapDrawComponent } from './components/map-draw/map-draw.component';

@NgModule({
  declarations: [
    AppComponent,
    MapDrawComponent
  ],
  imports: [
    BrowserModule,
    DragDropDirectiveModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyCH2fPF73m7rlBHjGKHbQORYTrr87_cGOM'
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
