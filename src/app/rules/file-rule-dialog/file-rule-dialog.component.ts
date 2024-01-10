import { ChangeDetectionStrategy, Component, Inject } from '@angular/core';
import {
  FormGroup,
  FormControl,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FileRuleDialogData } from '../rules/rules.component';

@Component({
  selector: 'fm-file-rule-dialog',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    ReactiveFormsModule,
    MatDialogModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
  ],
  templateUrl: './file-rule-dialog.component.html',
  styleUrl: './file-rule-dialog.component.scss',
})
export class FileRuleDialogComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: FileRuleDialogData) {}

  form = new FormGroup({
    rule: new FormGroup({
      pattern: new FormControl(this.data.pattern, {
        nonNullable: true,
        validators: Validators.required,
      }),
      targetFolder: new FormControl(this.data.targetFolder, {
        nonNullable: true,
        validators: Validators.required,
      }),
    }),
  });

  submitForm() {
    const formValue = this.form.getRawValue();
    this.data.pattern = formValue.rule.pattern;
    this.data.targetFolder = formValue.rule.targetFolder;
    this.data.result = true;
  }
}
