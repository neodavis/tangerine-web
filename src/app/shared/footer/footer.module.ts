import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FooterComponent } from './components';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
  declarations: [
    FooterComponent,
  ],
  imports: [
    CommonModule,
    MatButtonModule,
  ],
  exports: [
    FooterComponent,
  ],
})
export class FooterModule {
}
