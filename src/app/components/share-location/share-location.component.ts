import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { latLng, LeafletMouseEvent, marker, tileLayer } from 'leaflet';
import { ProviderClass } from 'src/app/classes/provider-class';
import { IncommitDialogData } from 'src/app/models/dialog-config.model';
import { ShareLocationModel } from 'src/app/models/share-location.model';
import { ShareLocationService } from 'src/app/services/share-location.service';
import { SharedService } from 'src/app/services/shared.service';
import * as L from 'leaflet';
import { EventNotifierService } from 'src/app/services/event-notifier.service';

@Component({
  selector: 'app-share-location',
  templateUrl: './share-location.component.html',
  styleUrls: ['./share-location.component.scss']
})
export class ShareLocationComponent implements OnInit {

  incommingData!: IncommitDialogData;
  addLocationFormGroup!: FormGroup;
  previewMapOptions!: any
  imgUrl!: any
  constructor(
    private providerClass: ProviderClass,
    private formBuilder: FormBuilder,
    private sharedService: SharedService,
    private locationService: ShareLocationService,
    private eventNotifierService: EventNotifierService
  ) { }

  ngOnInit(): void {
    this.incommingData = this.providerClass as IncommitDialogData;
    this.previewMapOptions = {
      layers: [
        tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { maxZoom: 18, attribution: '...' }),
        marker([this.incommingData.latLng.lat, this.incommingData.latLng.lng])
      ],
      zoom: 18,
      center: latLng(this.incommingData.latLng.lat, this.incommingData.latLng.lng),
      zoomControl: false,

    };
    this.imgUrl = this.incommingData.currentLocation?.locationLogo
    this.initForm();
  }


  initForm() {
    this.addLocationFormGroup = this.formBuilder.group({
      locationName: [this.incommingData.currentLocation?.locationName || null, Validators.required],
      locationOnMap: [this.incommingData.currentLocation?.locationOnMap || null, Validators.required],
      locationType: [this.incommingData.currentLocation?.locationType || 'Busines', Validators.required],
      locationLogo: [this.incommingData.currentLocation?.locationLogo || null, Validators.required]
    })
  }




  previewImage(event: any) {
    if (event.target.files.length === 0)
      return;

    var reader = new FileReader();
    reader.readAsDataURL(event.target.files[0]);
    reader.onload = (_event) => {
      this.imgUrl = reader.result;
      this.addLocationFormGroup.patchValue({
        locationLogo: reader.result
      })
    }

  }

  onSubmit() {

    let formData: ShareLocationModel;
    formData = this.addLocationFormGroup.value;
    formData.locationOnMap = this.incommingData.latLng
    let storageDataArray: ShareLocationModel[] = [];
    this.locationService.getUserLocations().subscribe(res => {
      if (res)
        storageDataArray = JSON.parse(res);
      storageDataArray.push(formData)
      this.locationService.saveUserLocation(storageDataArray).subscribe(_ => {
        this.eventNotifierService.broadcast('newLocationAdded', formData)
        this.closeDialog()
      });

    })

  }

  closeDialog() {
    this.sharedService.closeDialog();
  }
}
