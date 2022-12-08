import { Component, ComponentFactoryResolver, Injector, OnInit } from '@angular/core';
import { latLng, LeafletEvent, LeafletMouseEvent, Map, Marker, marker, Popup, tileLayer } from 'leaflet';
import { DialogConfig, LatLng } from 'src/app/models/dialog-config.model';
import { ShareLocationModel } from 'src/app/models/share-location.model';
import { EventNotifierService } from 'src/app/services/event-notifier.service';
import { ShareLocationService } from 'src/app/services/share-location.service';
import { SharedService } from 'src/app/services/shared.service';
import { LocationDetailComponent } from '../location-detail/location-detail.component';
import { ShareLocationComponent } from '../share-location/share-location.component';
@Component({
  selector: 'app-map-container',
  templateUrl: './map-container.component.html',
  styleUrls: ['./map-container.component.scss']
})
export class MapContainerComponent implements OnInit {

  private map!: Map;
  options = {
    layers: [
      tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { maxZoom: 18, attribution: '...' })
    ] as any,
    zoom: 12,
    center: latLng(51.506209271143284, -0.12700453401642117)
  };

  constructor(
    private sharedService: SharedService,
    private locationService: ShareLocationService,
    private eventNotifierService: EventNotifierService,
    private injector: Injector,
    private resolver: ComponentFactoryResolver
  ) {

    this.eventNotifierService.ListenOn('newLocationAdded').subscribe((resp: any) => {
      this.addLocationMarker(resp)
    })

  }

  ngOnInit(): void {
    this.getSavedLocations()

  }

  getSavedLocations() {

    this.locationService.getUserLocations().subscribe(resp => {
      if (resp) {
        let locations: ShareLocationModel[] = JSON.parse(resp);
        locations.forEach((location: ShareLocationModel) => {
          const currentMarker = marker([location.locationOnMap.lat, location.locationOnMap.lng]);
          const popupContent = this.onPopUpReady(location, currentMarker);
          currentMarker.bindPopup(popupContent, { minWidth: 250, closeButton: false }).openPopup();
          this.options.layers.push(currentMarker)
        })
      }

    })
  }


  addLocationMarker(location: ShareLocationModel) {
    const newMarker = marker([location.locationOnMap.lat, location.locationOnMap.lng]);
    const popupContent = this.onPopUpReady(location, newMarker);
    newMarker.bindPopup(popupContent, { minWidth: 250, closeButton: false }).openPopup();
    newMarker.addTo(this.map);
  }


  onPopUpReady(location: ShareLocationModel, currentMarker: Marker) {
    const factory = this.resolver.resolveComponentFactory(LocationDetailComponent);
    const component = factory.create(this.injector);
    component.instance.location = location;
    component.instance.currentMarker = currentMarker;
    component.changeDetectorRef.detectChanges();
    return component.location.nativeElement
  }


  onMapReady(map: L.Map) {
    this.map = map;
  }
  addLocation(event: LeafletMouseEvent) {

    let dialogData: DialogConfig = {
      component: ShareLocationComponent,
      size: 'md',
      data: {
        latLng: event.latlng,
        title: 'Share location',
      }
    }
    this.sharedService.openDialog(dialogData)
  }

}
