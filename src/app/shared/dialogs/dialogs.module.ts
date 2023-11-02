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
  ReceiptEditDialogComponent,
  IngredientEditDialogComponent,
} from './components';

@NgModule({
  declarations: [
    SignInDialogComponent,
    SignUpDialogComponent,
    MenuEditDialogComponent,
    ReceiptEditDialogComponent,
    IngredientEditDialogComponent,
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
    IngredientEditDialogComponent,
  ],
})
export class DialogsModule {
}
