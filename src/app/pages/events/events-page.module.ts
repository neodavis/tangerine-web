import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';

import { FooterModule } from '@shared/footer';

import { EventsPageComponent } from './events-page.component';

@NgModule({
  declarations: [EventsPageComponent],
  imports: [
    CommonModule,
    FooterModule,
    TranslateModule.forChild(),
    RouterModule.forChild([
      {path: '', component: EventsPageComponent,}
    ]),
  ],
})
export class EventsPageModule {
}
