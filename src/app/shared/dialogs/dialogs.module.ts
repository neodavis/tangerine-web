import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialogModule } from '@angular/material/dialog';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { NgxMaskDirective } from 'ngx-mask';

import { AuthModule } from '@shared/auth';
import { SharedLoaderModule } from '@shared/loader';
import { SecondsToTimePipe } from '@shared/recipe/pipes';

import {
  SignInDialogComponent,
  SignUpDialogComponent,
  MenuEditDialogComponent,
  RecipeEditDialogComponent,
  IngredientEditDialogComponent,
  UserEditDialogComponent,
} from './components';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [
    SignInDialogComponent,
    SignUpDialogComponent,
    MenuEditDialogComponent,
    RecipeEditDialogComponent,
    IngredientEditDialogComponent,
    UserEditDialogComponent,
    SecondsToTimePipe,
  ],
  imports: [
    CommonModule,
    AuthModule,
    MatDialogModule,
    ReactiveFormsModule,
    SharedLoaderModule,
    MatButtonModule,
    NgxMaskDirective,
    TranslateModule.forChild(),
  ],
  exports: [
    SignInDialogComponent,
    SignUpDialogComponent,
    MenuEditDialogComponent,
    RecipeEditDialogComponent,
    IngredientEditDialogComponent,
    UserEditDialogComponent,
    SecondsToTimePipe,
  ],
})
export class DialogsModule {
}
