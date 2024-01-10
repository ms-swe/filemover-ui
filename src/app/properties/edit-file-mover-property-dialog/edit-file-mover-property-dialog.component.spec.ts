import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditFileMoverPropertyDialogComponent } from './edit-file-mover-property-dialog.component';

describe('EditFileMoverPropertyDialogComponent', () => {
  let component: EditFileMoverPropertyDialogComponent;
  let fixture: ComponentFixture<EditFileMoverPropertyDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditFileMoverPropertyDialogComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EditFileMoverPropertyDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
