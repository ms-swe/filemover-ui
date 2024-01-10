import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FileRuleDialogComponent } from './file-rule-dialog.component';

describe('FileRuleDialogComponent', () => {
  let component: FileRuleDialogComponent;
  let fixture: ComponentFixture<FileRuleDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FileRuleDialogComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(FileRuleDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
