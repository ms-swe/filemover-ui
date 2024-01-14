import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteAllEventsDialogComponent } from './delete-all-events-dialog.component';

describe('DeleteAllEventsDialogComponent', () => {
  let component: DeleteAllEventsDialogComponent;
  let fixture: ComponentFixture<DeleteAllEventsDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DeleteAllEventsDialogComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DeleteAllEventsDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
