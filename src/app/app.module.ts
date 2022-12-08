import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MapContainerComponent } from './components/map-container/map-container.component';
import { LeafletModule } from '@asymmetrik/ngx-leaflet';
import { ShareLocationComponent } from './components/share-location/share-location.component';
import { LocationDetailComponent } from './components/location-detail/location-detail.component';
import { DialogComponent } from './components/dialog/dialog.component';
import { ReactiveFormsModule } from '@angular/forms';
@NgModule({
  declarations: [
    AppComponent,
    MapContainerComponent,
    ShareLocationComponent,
    LocationDetailComponent,
    DialogComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    LeafletModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
