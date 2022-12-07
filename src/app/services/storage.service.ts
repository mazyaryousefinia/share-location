import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor() { }

  getStorage() {
    return 'test'
  }

  setStorage(title: string, data: string) {

  }

}
