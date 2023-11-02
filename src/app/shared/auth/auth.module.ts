import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';

import { SharedLoaderModule } from '@shared/loader';

import { JwtAuthGuard } from './guards';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    SharedLoaderModule,
    MatButtonModule,
  ],
  providers: [
    JwtAuthGuard,
  ],
})
export class AuthModule {
}
