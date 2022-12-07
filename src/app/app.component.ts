import { Component, OnInit } from '@angular/core';
import { circle, latLng, marker, polygon, tileLayer } from 'leaflet';
import { ShareLocationService } from './services/share-location.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  isShareLocationBefore!: boolean;
  options: any
  constructor(
    private shareLocationService: ShareLocationService
  ) { }


  ngOnInit(): void {
    this.options = {
      layers: [
        tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { maxZoom: 18, attribution: '...' })
      ],
      zoom: 12,
      center: latLng(51.50492708720905, -0.12151136990476255)
    };
    this.getSharedLocations();
  }

  getSharedLocations() {
    this.shareLocationService.getUserLocations().subscribe((resp: any) => {

    })
  }



}
