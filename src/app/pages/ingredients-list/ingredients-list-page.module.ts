import { NgModule } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';

import { TranslateModule } from '@ngx-translate/core';

import { AuthModule } from '@shared/auth';
import { SharedLoaderModule } from '@shared/loader';
import { DialogsModule } from '@shared/dialogs';

import { IngredientsListPageComponent } from './ingredients-list-page.component';
import { CommentsModule } from '@shared/comments/comments.module';
import { FooterModule } from '@shared/footer';

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
        NgOptimizedImage,
        CommentsModule,
        TranslateModule.forChild(),
        RouterModule.forChild([
            {path: '', component: IngredientsListPageComponent},
        ]),
        FooterModule,
    ],
})
export class IngredientsListPageModule {
}
