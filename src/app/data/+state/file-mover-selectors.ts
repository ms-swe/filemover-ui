import { createFeatureSelector } from '@ngrx/store';
import { FileMoverState, fileMoverFeatureKey } from './file-mover.reducers';

export const selectFileMoverState =
  createFeatureSelector<FileMoverState>(fileMoverFeatureKey);
