import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { LifeEventViewComponent } from '../life-event-view/life-event-view.component';
import { HistoricalEventViewComponent } from '../historical-event-view/historical-event-view.component';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'fm-events',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.scss'],
  imports: [
    LifeEventViewComponent,
    HistoricalEventViewComponent,
    MatIconModule,
  ],
})
export class EventsComponent {
  showingHistoricalEvents = signal<boolean>(false);

  showHistoricalEvents() {
    this.showingHistoricalEvents.set(true);
  }
}
