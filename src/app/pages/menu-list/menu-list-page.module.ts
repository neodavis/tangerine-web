import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';

import { AgGridModule } from 'ag-grid-angular';


import { AuthModule } from '../../shared/auth';
import { SharedLoaderModule } from '../../shared/loader';
import { DialogsModule } from '../../shared/dialogs';
import { MenuListPageComponent } from './menu-list-page.component';


@NgModule({
    declarations: [
      MenuListPageComponent,
    ],
    imports: [
        CommonModule,
        MatButtonModule,
        AuthModule,
        SharedLoaderModule,
        DialogsModule,
        AgGridModule,
        RouterModule.forChild([
            {path: '', component: MenuListPageComponent},
        ]),
    ],
})
export class MenuListPageModule {}
