import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReceiptListPageComponent } from './receipt-list-page.component';
import { RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { AuthModule } from 'src/app/shared/auth';
import { SharedLoaderModule } from 'src/app/shared/loader';
import { DialogsModule } from 'src/app/shared/dialogs';
import { AgGridModule } from 'ag-grid-angular';

@NgModule({
    declarations: [
        ReceiptListPageComponent,
    ],
    imports: [
        CommonModule,
        MatButtonModule,
        AuthModule,
        SharedLoaderModule,
        DialogsModule,
        AgGridModule,
        RouterModule.forChild([
            {path: '', component: ReceiptListPageComponent},
        ]),
    ],
})
export class ReceiptListPageModule {}
