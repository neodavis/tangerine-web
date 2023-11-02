import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-shared-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoaderComponent {
}
