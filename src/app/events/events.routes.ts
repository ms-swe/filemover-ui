import { Routes } from '@angular/router';
import { EventsComponent } from './events/events.component';
import { fileMoverFeature } from '../data/+state/file-mover.reducers';
import { FileMoverEffects } from '../data/+state/file-mover.effects';
import { provideState } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';

export const EVENTS_ROUTES: Routes = [
  {
    path: '',
    component: EventsComponent,
    providers: [
      provideState(fileMoverFeature),
      provideEffects(FileMoverEffects),
    ],
  },
];
