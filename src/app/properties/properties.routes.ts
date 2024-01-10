import { Routes } from '@angular/router';
import { PropertiesComponent } from './properties/properties.component';
import { provideState } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { FileMoverEffects } from '../data/+state/file-mover.effects';
import { fileMoverFeature } from '../data/+state/file-mover.reducers';

export const PROPERTIES_ROUTES: Routes = [
  {
    path: '',
    component: PropertiesComponent,
    providers: [
      provideState(fileMoverFeature),
      provideEffects(FileMoverEffects),
    ],
  },
];
