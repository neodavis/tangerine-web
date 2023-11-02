import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { JwtAuthGuard } from '@shared/auth/guards';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./pages/home/home-page.module').then(m => m.HomePageModule),
  },
  {
    path: 'menu-list',
    loadChildren: () => import('./pages/menu-list/menu-list-page.module').then((mod) => mod.MenuListPageModule),
    // canActivate: [JwtAuthGuard],
  },
  {
    path: 'receipt-list',
    loadChildren: () => import('./pages/receipt-list/receipt-list-page.module').then((mod) => mod.ReceiptListPageModule),
    // canActivate: [JwtAuthGuard],
  },
  {
    path: 'ingredients-list',
    loadChildren: () => import('./pages/ingredients-list/ingredients-list-page.module').then((mod) => mod.IngredientsListPageModule),
    // canActivate: [JwtAuthGuard],
  },
  {
    path: 'frequently-asked-questions',
    loadChildren: () => import('./pages/frequently-asked/frequently-asked-page.module').then((mod) => mod.FrequentlyAskedPageModule),
  },
  {
    path: 'events',
    loadChildren: () => import('./pages/events/events-page.module').then((mod) => mod.EventsPageModule),
  },
  {
    path: '**',
    redirectTo: 'home',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
