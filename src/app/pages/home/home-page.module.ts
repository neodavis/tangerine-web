import { NgModule } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { RouterModule } from '@angular/router';

import { FooterModule } from '../../shared/footer';
import { HomeHeaderComponent } from './components';
import { HomePageComponent } from './home-page.component';

@NgModule({
    declarations: [HomePageComponent, HomeHeaderComponent],
    imports: [
        CommonModule,
        NgOptimizedImage,
        FooterModule,
        RouterModule.forChild([
            {path: '', component: HomePageComponent,}
        ]),
    ],
})
export class HomePageModule { }
