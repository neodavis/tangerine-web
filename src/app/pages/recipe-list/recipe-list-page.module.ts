import { NgModule } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatButtonModule } from '@angular/material/button';

import { AgGridModule } from 'ag-grid-angular';

import { AuthModule } from '@shared/auth';
import { SharedLoaderModule } from '@shared/loader';
import { DialogsModule } from '@shared/dialogs';
import { RecipePermissionPipe } from '@shared/recipe/pipes';
import { CommentsModule } from '@shared/comments';

import { RecipeListPageComponent } from './recipe-list-page.component';
import { TranslateModule } from '@ngx-translate/core';
import { FooterModule } from '@shared/footer';

@NgModule({
  declarations: [
    RecipeListPageComponent,
    RecipePermissionPipe
  ],
    imports: [
        CommonModule,
        MatButtonModule,
        AuthModule,
        SharedLoaderModule,
        DialogsModule,
        AgGridModule,
        MatExpansionModule,
        CommentsModule,
        NgOptimizedImage,
        TranslateModule.forChild(),
        RouterModule.forChild([
            {path: '', component: RecipeListPageComponent},
        ]),
        FooterModule,
    ],
})
export class RecipeListPageModule {
}
