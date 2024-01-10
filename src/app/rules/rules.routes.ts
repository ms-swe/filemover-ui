import { Routes } from '@angular/router';
import { RulesComponent } from './rules/rules.component';
import { provideState } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { FileMoverEffects } from '../data/+state/file-mover.effects';
import { fileMoverFeature } from '../data/+state/file-mover.reducers';

export const RULES_ROUTES: Routes = [
  {
    path: '',
    component: RulesComponent,
    providers: [
      provideState(fileMoverFeature),
      provideEffects(FileMoverEffects),
    ],
  },
];
