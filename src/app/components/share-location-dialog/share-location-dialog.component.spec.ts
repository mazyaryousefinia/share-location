import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShareLocationDialogComponent } from './share-location-dialog.component';

describe('ShareLocationDialogComponent', () => {
  let component: ShareLocationDialogComponent;
  let fixture: ComponentFixture<ShareLocationDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShareLocationDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ShareLocationDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
