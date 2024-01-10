import {
  ChangeDetectionStrategy,
  Component,
  effect,
  inject,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FileMoverFacade } from 'src/app/data/file-mover.facade';
import { MatTableModule, MatTableDataSource } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FileRule } from 'src/app/data/model/file-rule';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { DeleteFileRuleDialogComponent } from '../delete-file-rule-dialog/delete-file-rule-dialog.component';
import { FileRuleDialogComponent } from '../file-rule-dialog/file-rule-dialog.component';
import { CdkDragDrop, DragDropModule } from '@angular/cdk/drag-drop';

export interface FileRuleDialogData {
  mode: 'add' | 'edit';
  pattern: string;
  targetFolder: string;
  result: boolean;
}

@Component({
  selector: 'fm-rules',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    CommonModule,
    MatTableModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatDialogModule,
    DragDropModule,
  ],
  templateUrl: './rules.component.html',
  styleUrls: ['./rules.component.scss'],
})
export class RulesComponent {
  private facade = inject(FileMoverFacade);

  fileRules = this.facade.fileRules;
  loading = this.facade.loadingFileRules;

  displayedColumns: string[] = ['pattern', 'targetFolder', 'edit', 'delete'];

  dataSource = new MatTableDataSource<FileRule>([]);

  constructor(private dialog: MatDialog) {
    this.facade.loadFileRules();

    effect(() => {
      this.dataSource.data = this.fileRules();
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  addRule() {
    const dialogRef = this.dialog.open(FileRuleDialogComponent, {
      width: '80%',
      maxWidth: '600px',
      data: {
        mode: 'add',
        pattern: '',
        targetFolder: '',
        result: false,
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result?.result === true) {
        this.facade.createFileRule(result.pattern, result.targetFolder);
      }
    });
  }

  editRule(row: FileRule) {
    const dialogRef = this.dialog.open(FileRuleDialogComponent, {
      width: '80%',
      maxWidth: '600px',
      data: {
        mode: 'edit',
        pattern: row.pattern,
        targetFolder: row.targetFolder,
        result: false,
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result.result === true) {
        const updatedRule: FileRule = {
          id: row.id,
          priority: row.priority,
          pattern: result.pattern,
          targetFolder: result.targetFolder,
        };
        this.facade.updateFileRule(updatedRule);
      }
    });
  }

  deleteRule(row: FileRule) {
    const dialogRef = this.dialog.open(DeleteFileRuleDialogComponent, {
      width: '80%',
      maxWidth: '600px',
      data: { pattern: row.pattern },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result === true) {
        this.facade.deleteFileRule(row.id!);
      }
    });
  }

  dropTableRow(event: CdkDragDrop<MatTableDataSource<FileRule>>) {
    if (event.previousIndex == event.currentIndex) {
      return;
    }

    let newPriority = -1;
    if (event.currentIndex == 0) {
      newPriority = 0; // Server will calculate new highest priority
    } else if (event.currentIndex < event.previousIndex) {
      newPriority = this.fileRules()[event.currentIndex - 1].priority!;
    } else {
      newPriority = this.fileRules()[event.currentIndex].priority!;
    }

    const updatedRule: FileRule = {
      ...event.item.data,
      priority: newPriority,
    };
    this.facade.updateFileRule(updatedRule);
  }
}
