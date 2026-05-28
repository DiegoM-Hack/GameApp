import { Routes } from '@angular/router';

export const routes: Routes = [

  // Pantalla inicial
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },

  // Página Home
  {
    path: 'home',
    loadComponent: () =>
      import('./pages/home/home.page')
        .then(m => m.HomePage)
  },

  // Tabs
  {
    path: 'tabs',
    loadChildren: () =>
      import('./tabs/tabs.routes')
        .then(m => m.routes),
  }

];