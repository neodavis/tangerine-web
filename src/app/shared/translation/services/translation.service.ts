import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Injectable({
  providedIn: 'root'
})
export class TranslationService {
  constructor(private translate: TranslateService) { }

  getCurrentLanguage() {
    return this.translate.currentLang;
  }

  setLanguage(language: string) {
    this.translate.use(language);
  }
}
