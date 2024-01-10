import { Routes } from '@angular/router';

export const APP_ROUTES: Routes = [
  { path: '', redirectTo: 'events', pathMatch: 'full' },
  {
    path: 'events',
    loadChildren: () =>
      import('./events/events.routes').then((m) => m.EVENTS_ROUTES),
  },
  {
    path: 'rules',
    loadChildren: () =>
      import('./rules/rules.routes').then((m) => m.RULES_ROUTES),
  },
  {
    path: 'properties',
    loadChildren: () =>
      import('./properties/properties.routes').then((m) => m.PROPERTIES_ROUTES),
  },
];
