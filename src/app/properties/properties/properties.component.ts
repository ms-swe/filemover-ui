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
import { FileMoverProperty } from 'src/app/data/model/file-mover-property';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { EditFileMoverPropertyDialogComponent } from '../edit-file-mover-property-dialog/edit-file-mover-property-dialog.component';

export interface EditFileMoverPropertyDialogData {
  name: string;
  value: string;
  result: boolean;
}

@Component({
  selector: 'fm-properties',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    CommonModule,
    MatTableModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatDialogModule,
  ],
  templateUrl: './properties.component.html',
  styleUrls: ['./properties.component.scss'],
})
export class PropertiesComponent {
  private facade = inject(FileMoverFacade);

  fileMoverProperties = this.facade.fileMoverProperties;
  loading = this.facade.loadingFileMoverProperties;

  displayedColumns: string[] = ['name', 'value', 'edit'];

  dataSource = new MatTableDataSource<FileMoverProperty>([]);

  constructor(private dialog: MatDialog) {
    this.facade.loadFileMoverProperties();

    effect(() => {
      this.dataSource.data = this.fileMoverProperties();
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  editProperty(row: FileMoverProperty) {
    const dialogRef = this.dialog.open(EditFileMoverPropertyDialogComponent, {
      width: '80%',
      maxWidth: '600px',
      data: { name: row.name, value: row.value },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result.result === true) {
        const updatedPropery: FileMoverProperty = {
          id: row.id,
          name: row.name,
          value: result.value,
        };
        this.facade.updateFileMoverProperty(updatedPropery);
      }
    });
  }
}
