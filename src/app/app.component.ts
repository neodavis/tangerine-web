import { ChangeDetectionStrategy, Component } from '@angular/core';

import { TranslationService } from '@shared/translation/services';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {
  constructor(private translate: TranslationService) {
    translate.setLanguage('uk')
  }
}
