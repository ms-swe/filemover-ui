import {
  ChangeDetectionStrategy,
  Component,
  effect,
  inject,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FileMoverFacade } from 'src/app/data/file-mover.facade';
import { FileMoverEvent } from 'src/app/data/model/file-mover-event';
import { MatTableModule, MatTableDataSource } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'fm-events',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, MatTableModule, MatFormFieldModule, MatInputModule],
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.scss'],
})
export class EventsComponent {
  private facade = inject(FileMoverFacade);

  fileMoverEvents = this.facade.fileMoverEvents;
  loading = this.facade.loadingFileMoverEvents;

  displayedColumns: string[] = ['description', 'created'];

  dataSource = new MatTableDataSource<FileMoverEvent>([]);

  constructor() {
    this.facade.loadFileMoverEvents();

    effect(() => {
      this.dataSource.data = this.fileMoverEvents();
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}
