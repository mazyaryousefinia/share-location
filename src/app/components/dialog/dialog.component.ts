import { Component, ComponentRef, Injector, OnInit } from '@angular/core';
import { ProviderClass } from 'src/app/classes/provider-class';
import { DialogConfig } from 'src/app/models/dialog-config.model';
import { EventNotifierService } from 'src/app/services/event-notifier.service';
@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss']
})
export class DialogComponent implements OnInit {

  componentTemplate!: any
  componentContent!: Injector;
  isShowDialog!: boolean;
  dialogSize: string = 'md'
  constructor(
    private injector: Injector,
    private eventNotifierService: EventNotifierService
  ) {

    this.eventNotifierService.ListenOn('openDialog').subscribe((resp: any) => {
      if (resp) {
        this.dialogSize = resp.size;
        this.componentTemplate = resp.component;
        this.componentContent = Injector.create([{ provide: ProviderClass, useValue: resp.data }], this.injector)
        this.isShowDialog = true
      }
    })

    this.eventNotifierService.ListenOn('closeDialog').subscribe(_ => {
      this.closeDialog()
    })

  }

  closeDialog() {
    this.isShowDialog = false;
  }

  ngOnInit(): void {
  }

}
