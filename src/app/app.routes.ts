import { Routes } from '@angular/router';

export const routes: Routes = [

  // Pantalla inicial
  {
    path: '',
    redirectTo: 'login',
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
  },

  {
    path: 'login',
    loadComponent: () => import('./pages/login/login.page').then( m => m.LoginPage)
  },
  {
    path: 'register',
    loadComponent: () => import('./pages/register/register.page').then( m => m.RegisterPage)
  }

];

