import { Injectable } from '@angular/core';
import { DialogConfig } from '../models/dialog-config.model';
import { EventNotifierService } from './event-notifier.service';

@Injectable({
  providedIn: 'root'
})
export class SharedService {


  constructor(
    private eventNotifierService: EventNotifierService
  ) { }

  openDialog(dialogData: DialogConfig) {
    this.eventNotifierService.broadcast('openDialog', dialogData);
  }

  closeDialog() {
    this.eventNotifierService.broadcast('closeDialog');
  }

}
