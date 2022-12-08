import { Injectable } from '@angular/core';
import { observable, Observable, of } from 'rxjs';
import { ShareLocationModel } from '../models/share-location.model';
import { StorageService } from './storage.service';

@Injectable({
  providedIn: 'root'
})
export class ShareLocationService {

  constructor(
    private storageService: StorageService
  ) { }


  getUserLocations(): Observable<any> {
    return of(this.storageService.getStorage('SharedLocations'));
  }

  saveUserLocation(locationInfo: ShareLocationModel[]): Observable<any> {
    return of(this.storageService.setStorage('SharedLocations', JSON.stringify(locationInfo)))
  }

}
