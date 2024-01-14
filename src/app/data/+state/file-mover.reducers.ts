import { createFeature, createReducer, on } from '@ngrx/store';
import { fileMoverActions } from './file-mover.actions';
import { FileRule } from '../model/file-rule';
import { FileMoverProperty } from '../model/file-mover-property';
import { FileMoverEvent } from '../model/file-mover-event';

export const fileMoverFeatureKey = 'fileMover';

export interface FileMoverState {
  fileRules: FileRule[];
  loadingFileRules: boolean;

  fileMoverProperties: FileMoverProperty[];
  loadingFileMoverProperties: boolean;

  fileMoverEvents: FileMoverEvent[];
  loadingFileMoverEvents: boolean;
}

export const initialFileMoverState: FileMoverState = {
  fileRules: [],
  loadingFileRules: false,

  fileMoverProperties: [],
  loadingFileMoverProperties: false,

  fileMoverEvents: [],
  loadingFileMoverEvents: false,
};

export const fileMoverFeature = createFeature({
  name: 'fileMover',
  reducer: createReducer<FileMoverState>(
    initialFileMoverState,

    on(fileMoverActions.loadFileRules, (state): FileMoverState => {
      const fileRules = [] as FileRule[];
      return {
        ...state,
        fileRules,
        loadingFileRules: true,
      };
    }),

    on(fileMoverActions.fileRulesLoaded, (state, action): FileMoverState => {
      const fileRules = action.fileRules;
      return {
        ...state,
        fileRules,
        loadingFileRules: false,
      };
    }),

    on(fileMoverActions.loadFileMoverProperties, (state): FileMoverState => {
      const fileMoverProperties = [] as FileMoverProperty[];
      return {
        ...state,
        fileMoverProperties,
        loadingFileMoverProperties: true,
      };
    }),

    on(
      fileMoverActions.fileMoverPropertiesLoaded,
      (state, action): FileMoverState => {
        const fileMoverProperties = action.fileMoverProperties;
        return {
          ...state,
          fileMoverProperties,
          loadingFileMoverProperties: false,
        };
      },
    ),

    on(fileMoverActions.loadFileMoverEvents, (state): FileMoverState => {
      const fileMoverEvents = [] as FileMoverEvent[];
      return {
        ...state,
        fileMoverEvents,
        loadingFileMoverEvents: true,
      };
    }),

    on(
      fileMoverActions.fileMoverEventsLoaded,
      (state, action): FileMoverState => {
        const fileMoverEvents = action.fileMoverEvents;
        return {
          ...state,
          fileMoverEvents,
          loadingFileMoverEvents: false,
        };
      },
    ),

    on(fileMoverActions.deleteAllFileMoverEvents, (state): FileMoverState => {
      return {
        ...state,
      };
    }),

    on(fileMoverActions.allFileMoverEventsDeleted, (state): FileMoverState => {
      const fileMoverEvents = [] as FileMoverEvent[];
      return {
        ...state,
        fileMoverEvents,
      };
    }),

    on(fileMoverActions.fileRuleCreated, (state, action): FileMoverState => {
      const fileRule = action.fileRule;
      const fileRules = [fileRule, ...state.fileRules];

      return {
        ...state,
        fileRules,
      };
    }),

    on(fileMoverActions.fileRuleDeleted, (state, action) => {
      const indexToDelete = state.fileRules.findIndex(
        (s) => s.id == action.fileRuleId,
      );
      const fileRules = [
        ...state.fileRules.slice(0, indexToDelete),
        ...state.fileRules.slice(indexToDelete + 1),
      ];
      return {
        ...state,
        fileRules,
      };
    }),

    on(fileMoverActions.fileRuleUpdated, (state, action): FileMoverState => {
      const fileRule = action.fileRule;

      const indexToReplace = state.fileRules.findIndex(
        (s) => s.id == action.fileRule.id,
      );
      const fileRules = [
        ...state.fileRules.slice(0, indexToReplace),
        fileRule,
        ...state.fileRules.slice(indexToReplace + 1),
      ];

      return {
        ...state,
        fileRules,
      };
    }),

    on(
      fileMoverActions.fileMoverPropertyUpdated,
      (state, action): FileMoverState => {
        const fileMoverProperty = action.fileMoverPropery;

        const indexToReplace = state.fileMoverProperties.findIndex(
          (s) => s.id == action.fileMoverPropery.id,
        );
        const fileMoverProperties = [
          ...state.fileMoverProperties.slice(0, indexToReplace),
          fileMoverProperty,
          ...state.fileMoverProperties.slice(indexToReplace + 1),
        ];

        return {
          ...state,
          fileMoverProperties,
        };
      },
    ),
  ),
});
