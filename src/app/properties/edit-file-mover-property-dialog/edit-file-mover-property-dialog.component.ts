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
import { EditFileMoverPropertyDialogData } from '../properties/properties.component';

@Component({
  selector: 'fm-edit-file-mover-property-dialog',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    ReactiveFormsModule,
    MatDialogModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
  ],
  templateUrl: './edit-file-mover-property-dialog.component.html',
  styleUrl: './edit-file-mover-property-dialog.component.scss',
})
export class EditFileMoverPropertyDialogComponent {
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: EditFileMoverPropertyDialogData,
  ) {}

  form = new FormGroup({
    property: new FormGroup({
      name: new FormControl({ value: this.data.name, disabled: true }),
      value: new FormControl(this.data.value, {
        nonNullable: true,
        validators: Validators.required,
      }),
    }),
  });

  submitForm() {
    const formValue = this.form.getRawValue();
    this.data.value = formValue.property.value;
    this.data.result = true;
  }
}
