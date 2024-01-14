import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
  inject,
  signal,
} from '@angular/core';
import { webSocket } from 'rxjs/webSocket';
import { FileMoverEvent } from 'src/app/data/model/file-mover-event';
import { MatIconModule } from '@angular/material/icon';
import { FileMoverFacade } from 'src/app/data/file-mover.facade';

@Component({
  selector: 'fm-life-event-view',
  standalone: true,
  imports: [CommonModule, MatIconModule],
  templateUrl: './life-event-view.component.html',
  styleUrl: './life-event-view.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LifeEventViewComponent implements OnDestroy {
  MAX_LIFE_EVENTS = 10;

  private facade = inject(FileMoverFacade);

  private webSocket$ = webSocket<FileMoverEvent>(
    'ws://localhost:8080/lifeFileMoverEvents',
  );

  recentEvents = signal<FileMoverEvent[]>([]);

  constructor() {
    this.webSocket$.subscribe((message) => {
      this.storeLifeEvent(message);
    });
  }

  ngOnDestroy(): void {
    this.webSocket$.unsubscribe();
  }

  storeLifeEvent(message: FileMoverEvent) {
    this.recentEvents.update((val) => {
      const newArray = [message, ...val];
      while (newArray.length > this.MAX_LIFE_EVENTS) {
        newArray.pop();
      }
      return newArray;
    });
  }

  navigate(event: FileMoverEvent) {
    this.facade.navigateFileMoverEvent(event.id!);
  }
}
