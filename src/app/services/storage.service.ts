import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor() { }

  getStorage(key: string) {
    return localStorage.getItem(key)
  }

  setStorage(key: string, value: string) {
    localStorage.setItem(key, value)
  }

}
