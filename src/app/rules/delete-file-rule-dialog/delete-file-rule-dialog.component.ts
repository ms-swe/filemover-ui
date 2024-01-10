import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';

@Component({
  selector: 'fm-delete-file-rule-dialog',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, MatDialogModule, MatButtonModule],
  templateUrl: './delete-file-rule-dialog.component.html',
  styleUrl: './delete-file-rule-dialog.component.scss',
})
export class DeleteFileRuleDialogComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: { pattern: string }) {}
}
