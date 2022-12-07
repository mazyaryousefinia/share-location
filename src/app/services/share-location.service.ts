import { Injectable } from '@angular/core';
import { observable, Observable, of } from 'rxjs';
import { StorageService } from './storage.service';

@Injectable({
  providedIn: 'root'
})
export class ShareLocationService {

  constructor(
    private storageService: StorageService
  ) { }


  getUserLocations(): Observable<any> {
    return of(this.storageService.getStorage());
  }

}
