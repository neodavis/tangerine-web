import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { FooterModule } from '@shared/footer';

import { FrequentlyAskedPageComponent } from './frequently-asked-page.component';

@NgModule({
    declarations: [FrequentlyAskedPageComponent],
    imports: [
        CommonModule,
        FooterModule,
        RouterModule.forChild([
            {path: '', component: FrequentlyAskedPageComponent }
        ]),
    ],
})
export class FrequentlyAskedPageModule { }
