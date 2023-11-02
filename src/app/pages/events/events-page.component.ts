import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-frequently-asked',
  templateUrl: './events-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EventsPageComponent { }
