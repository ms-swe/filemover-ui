import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { FileRule } from '../model/file-rule';
import { FileMoverProperty } from '../model/file-mover-property';
import { FileMoverEvent } from '../model/file-mover-event';

export const fileMoverActions = createActionGroup({
  source: 'fileMover',
  events: {
    'load file rules': emptyProps(),
    'file rules loaded': props<{ fileRules: FileRule[] }>(),

    'load file mover properties': emptyProps(),
    'file mover properties loaded': props<{
      fileMoverProperties: FileMoverProperty[];
    }>(),

    'load file mover events': emptyProps(),
    'file mover events loaded': props<{ fileMoverEvents: FileMoverEvent[] }>(),

    'delete all file mover events': emptyProps(),
    'all file mover events deleted': emptyProps(),

    'navigate file mover event': props<{ fileMoverEventId: number }>(),
    'file mover event navigated': emptyProps(),

    'create file rule': props<{ fileRule: FileRule }>(),
    'file rule created': props<{ fileRule: FileRule }>(),

    'delete file rule': props<{ fileRuleId: number }>(),
    'file rule deleted': props<{ fileRuleId: number }>(),

    'update file rule': props<{
      fileRule: FileRule;
    }>(),
    'file rule updated': props<{
      fileRule: FileRule;
    }>(),

    'update file mover property': props<{
      fileMoverProperty: FileMoverProperty;
    }>(),
    'file mover property updated': props<{
      fileMoverPropery: FileMoverProperty;
    }>(),
  },
});
