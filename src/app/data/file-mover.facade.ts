import { Injectable, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { fileMoverFeature } from './+state/file-mover.reducers';
import { fileMoverActions } from './+state/file-mover.actions';
import { FileRule } from './model/file-rule';
import { FileMoverProperty } from './model/file-mover-property';

@Injectable({ providedIn: 'root' })
export class FileMoverFacade {
  private store = inject(Store);

  readonly fileRules = this.store.selectSignal(
    fileMoverFeature.selectFileRules,
  );

  async loadFileRules(): Promise<void> {
    this.store.dispatch(fileMoverActions.loadFileRules());
  }

  readonly loadingFileRules = this.store.selectSignal(
    fileMoverFeature.selectLoadingFileRules,
  );

  async createFileRule(pattern: string, targetFolder: string): Promise<void> {
    const fileRule: FileRule = {
      pattern: pattern,
      targetFolder: targetFolder,
    };
    this.store.dispatch(fileMoverActions.createFileRule({ fileRule }));
  }

  async deleteFileRule(id: number): Promise<void> {
    this.store.dispatch(
      fileMoverActions.deleteFileRule({
        fileRuleId: id,
      }),
    );
  }

  async updateFileRule(rule: FileRule): Promise<void> {
    this.store.dispatch(
      fileMoverActions.updateFileRule({
        fileRule: rule,
      }),
    );
  }
  readonly fileMoverEvents = this.store.selectSignal(
    fileMoverFeature.selectFileMoverEvents,
  );

  async loadFileMoverEvents(): Promise<void> {
    this.store.dispatch(fileMoverActions.loadFileMoverEvents());
  }

  readonly loadingFileMoverEvents = this.store.selectSignal(
    fileMoverFeature.selectLoadingFileMoverEvents,
  );

  readonly fileMoverProperties = this.store.selectSignal(
    fileMoverFeature.selectFileMoverProperties,
  );

  async loadFileMoverProperties(): Promise<void> {
    this.store.dispatch(fileMoverActions.loadFileMoverProperties());
  }

  readonly loadingFileMoverProperties = this.store.selectSignal(
    fileMoverFeature.selectLoadingFileMoverProperties,
  );

  async updateFileMoverProperty(property: FileMoverProperty): Promise<void> {
    this.store.dispatch(
      fileMoverActions.updateFileMoverProperty({
        fileMoverProperty: property,
      }),
    );
  }
}
