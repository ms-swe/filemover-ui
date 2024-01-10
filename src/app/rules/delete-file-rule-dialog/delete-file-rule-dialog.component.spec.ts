import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteFileRuleDialogComponent } from './delete-file-rule-dialog.component';

describe('DeleteFileRuleDialogComponent', () => {
  let component: DeleteFileRuleDialogComponent;
  let fixture: ComponentFixture<DeleteFileRuleDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DeleteFileRuleDialogComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DeleteFileRuleDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
