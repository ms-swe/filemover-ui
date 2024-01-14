import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  effect,
  inject,
} from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { FileMoverFacade } from 'src/app/data/file-mover.facade';
import { FileMoverEvent } from 'src/app/data/model/file-mover-event';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { DeleteAllEventsDialogComponent } from '../delete-all-events-dialog/delete-all-events-dialog.component';

@Component({
  selector: 'fm-historical-event-view',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatDialogModule,
  ],
  templateUrl: './historical-event-view.component.html',
  styleUrl: './historical-event-view.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HistoricalEventViewComponent {
  private facade = inject(FileMoverFacade);

  fileMoverEvents = this.facade.fileMoverEvents;
  loading = this.facade.loadingFileMoverEvents;

  displayedColumns: string[] = [
    'navigate',
    'created',
    'fileName',
    'targetFolder',
  ];

  dataSource = new MatTableDataSource<FileMoverEvent>([]);

  constructor(private dialog: MatDialog) {
    this.facade.loadFileMoverEvents();
    effect(() => {
      this.dataSource.data = this.fileMoverEvents();
    });
  }

  refresh() {
    this.facade.loadFileMoverEvents();
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  navigate(event: FileMoverEvent) {
    this.facade.navigateFileMoverEvent(event.id!);
  }

  deleteAll() {
    const dialogRef = this.dialog.open(DeleteAllEventsDialogComponent, {
      width: '80%',
      maxWidth: '600px',
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result === true) {
        this.facade.deleteAllFileMoverEvents();
      }
    });
  }
}
