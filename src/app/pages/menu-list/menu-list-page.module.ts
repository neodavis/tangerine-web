import { NgModule } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatExpansionModule } from '@angular/material/expansion';

import { AgGridModule } from 'ag-grid-angular';

import { AuthModule } from '@shared/auth';
import { SharedLoaderModule } from '@shared/loader';
import { DialogsModule } from '@shared/dialogs';
import { MenuPermissionPipe, MenuAveragePricePipe } from '@shared/menu/pipes';

import { MenuListPageComponent } from './menu-list-page.component';
import { TranslateModule } from '@ngx-translate/core';
import { FooterModule } from '@shared/footer';


@NgModule({
  declarations: [
    MenuListPageComponent,
    MenuPermissionPipe,
    MenuAveragePricePipe,
  ],
  imports: [
    CommonModule,
    MatButtonModule,
    AuthModule,
    SharedLoaderModule,
    DialogsModule,
    AgGridModule,
    MatExpansionModule,
    NgOptimizedImage,
    TranslateModule.forChild(),
    RouterModule.forChild([
      {path: '', component: MenuListPageComponent},
    ]),
    FooterModule,
  ],
})
export class MenuListPageModule {
}
