import { Component, Input, OnInit } from '@angular/core';
import { Marker, marker } from 'leaflet';
import { DialogConfig } from 'src/app/models/dialog-config.model';
import { ShareLocationModel } from 'src/app/models/share-location.model';
import { SharedService } from 'src/app/services/shared.service';
import { ShareLocationComponent } from '../share-location/share-location.component';

@Component({
  selector: 'app-location-detail',
  templateUrl: './location-detail.component.html',
  styleUrls: ['./location-detail.component.scss']
})
export class LocationDetailComponent implements OnInit {

  @Input() location!: ShareLocationModel
  @Input() currentMarker!: Marker
  constructor(
    private sharedService: SharedService
  ) { }

  ngOnInit(): void {

  }


  closePopUp() {
    this.currentMarker.closePopup()
  }

  openEditLocation() {
    let dialogData: DialogConfig = {
      component: ShareLocationComponent,
      size: 'md',
      data: {
        latLng: this.location.locationOnMap,
        title: 'Share location',
        currentLocation: this.location
      }

    }
    this.closePopUp()
    this.sharedService.openDialog(dialogData)
  }

}
