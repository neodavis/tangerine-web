import { ChangeDetectionStrategy, Component } from '@angular/core';

import { TranslationService } from '@shared/translation/services';

@Component({
  selector: 'app-language-switcher',
  templateUrl: './language-switcher.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LanguageSwitcherComponent {
  currentLanguage: string;

  constructor(private translationService: TranslationService) {
    this.currentLanguage = this.translationService.getCurrentLanguage();
  }

  toggleLanguage() {
    this.currentLanguage = this.currentLanguage === 'en' ? 'uk' : 'en';
    this.translationService.setLanguage(this.currentLanguage);
  }
}
