import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatMenuModule } from '@angular/material/menu';

import { TranslateModule } from '@ngx-translate/core';

import { AuthModule } from '@shared/auth';

import { LanguageSwitcherComponent, NavigationComponent } from './components';

@NgModule({
  declarations: [
    NavigationComponent,
    LanguageSwitcherComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    MatButtonModule,
    MatDialogModule,
    AuthModule,
    MatMenuModule,
    TranslateModule.forChild(),
  ],
  exports: [
    NavigationComponent,
  ],
})
export class NavigationModule {
}
