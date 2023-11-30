import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

import { TranslationService } from '@shared/translation/services';
import { UserService } from '@shared/auth/services';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent implements OnInit {
  constructor(
    private translate: TranslationService,
    private userService: UserService,
  ) {
    this.translate.setLanguage('uk')
  }

  ngOnInit(): void {
    const token = localStorage.getItem('jwtToken');

    if (token) {
      const isTokenValid = this.userService.isTokenValid(token);

      if (!isTokenValid) {
        localStorage.removeItem('jwtToken');
      }
    }
  }
}
