import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { EventsPageComponent } from './events-page.component';
import { FooterModule } from '../../shared/footer';

@NgModule({
    declarations: [EventsPageComponent],
    imports: [
        CommonModule,
        RouterModule.forChild([
            {path: '', component: EventsPageComponent,}
        ]),
        FooterModule
    ],
})
export class EventsPageModule { }
