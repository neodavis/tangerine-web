import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialogModule } from '@angular/material/dialog';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';

import { AuthModule } from '@shared/auth';
import { SharedLoaderModule } from '@shared/loader';

import {
  SignInDialogComponent,
  SignUpDialogComponent,
  MenuEditDialogComponent,
  ReceiptEditDialogComponent
} from './components';

@NgModule({
  declarations: [
    SignInDialogComponent,
    SignUpDialogComponent,
    MenuEditDialogComponent,
    ReceiptEditDialogComponent,
  ],
  imports: [
    CommonModule,
    AuthModule,
    MatDialogModule,
    ReactiveFormsModule,
    SharedLoaderModule,
    MatButtonModule,
  ],
  exports: [
    SignInDialogComponent,
    SignUpDialogComponent,
    MenuEditDialogComponent,
    ReceiptEditDialogComponent,
  ],
})
export class DialogsModule {
}
