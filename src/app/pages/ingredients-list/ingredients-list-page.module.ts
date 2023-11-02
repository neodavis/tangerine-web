import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';

import { AgGridModule } from 'ag-grid-angular';

import { AuthModule } from '@shared/auth';
import { SharedLoaderModule } from '@shared/loader';
import { DialogsModule } from '@shared/dialogs';

import { IngredientsListPageComponent } from './ingredients-list-page.component';


@NgModule({
  declarations: [
    IngredientsListPageComponent,
  ],
  imports: [
    CommonModule,
    MatButtonModule,
    AuthModule,
    SharedLoaderModule,
    DialogsModule,
    AgGridModule,
    RouterModule.forChild([
      {path: '', component: IngredientsListPageComponent},
    ]),
  ],
})
export class IngredientsListPageModule {
}
