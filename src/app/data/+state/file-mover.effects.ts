import { Injectable, inject } from '@angular/core';
import { FileMoverService } from '../file-mover.service';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { fileMoverActions } from './file-mover.actions';
import { concatMap, map, switchMap } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({ providedIn: 'root' })
export class FileMoverEffects {
  fileMoverService = inject(FileMoverService);
  actions$ = inject(Actions);
  snackBar = inject(MatSnackBar);

  // prettier-ignore
  loadFileRules = createEffect(() => {
    return this.actions$.pipe(
      ofType(fileMoverActions.loadFileRules),
      switchMap(() => this.fileMoverService.getAllFileRules()),
      map((fileRules) =>
        fileMoverActions.fileRulesLoaded({ fileRules })
      )
    )}
  );

  loadFileMoverProperties = createEffect(() => {
    return this.actions$.pipe(
      ofType(fileMoverActions.loadFileMoverProperties),
      switchMap(() => this.fileMoverService.getAllFileMoverProperties()),
      map((fileMoverProperties) =>
        fileMoverActions.fileMoverPropertiesLoaded({ fileMoverProperties }),
      ),
    );
  });

  loadFileMoverEvents = createEffect(() => {
    return this.actions$.pipe(
      ofType(fileMoverActions.loadFileMoverEvents),
      switchMap(() => this.fileMoverService.getAllFileMoverEvents()),
      map((fileMoverEvents) =>
        fileMoverActions.fileMoverEventsLoaded({ fileMoverEvents }),
      ),
    );
  });

  createFileRule = createEffect(() => {
    return this.actions$.pipe(
      ofType(fileMoverActions.createFileRule),
      concatMap((a) => this.fileMoverService.createFileRule(a.fileRule)),
      map((fileRule) => fileMoverActions.fileRuleCreated({ fileRule })),
    );
  });

  deleteFileRule = createEffect(() => {
    return this.actions$.pipe(
      ofType(fileMoverActions.deleteFileRule),
      concatMap((action) =>
        this.fileMoverService.deleteFileRule(action.fileRuleId).pipe(
          map(() =>
            fileMoverActions.fileRuleDeleted({
              fileRuleId: action.fileRuleId,
            }),
          ),
        ),
      ),
    );
  });

  updateFileRule = createEffect(() => {
    return this.actions$.pipe(
      ofType(fileMoverActions.updateFileRule),
      concatMap((action) =>
        this.fileMoverService
          .updateFileRule(action.fileRule)
          .pipe(map(() => fileMoverActions.loadFileRules())),
      ),
    );
  });

  updateFileMoverProperty = createEffect(() => {
    return this.actions$.pipe(
      ofType(fileMoverActions.updateFileMoverProperty),
      concatMap((action) =>
        this.fileMoverService
          .updateFileMoverProperty(action.fileMoverProperty)
          .pipe(
            map((fileMoverProperty) =>
              fileMoverActions.fileMoverPropertyUpdated({
                fileMoverPropery: fileMoverProperty,
              }),
            ),
          ),
      ),
    );
  });
}
