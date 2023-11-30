import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DatePipe } from '@angular/common';

import { BehaviorSubject, finalize, Observable } from 'rxjs';
import { GridOptions, GridReadyEvent, RowClickedEvent } from 'ag-grid-community';

import { MenuService } from '@shared/menu/services';
import { Menu } from '@shared/menu/models';
import { Recipe } from '@shared/recipe/models';
import { MenuEditDialogComponent } from '@shared/dialogs/components';
import { Clipboard } from '@angular/cdk/clipboard';
import { NotificationService } from '@shared/notification/services';

@Component({
  templateUrl: './menu-list-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [MenuService],
})
export class MenuListPageComponent implements OnInit {
  collection$: Observable<Menu[]> = this.menuService.getAllWithRecipes()
    .pipe(
      finalize(() => this.loading$.next(false))
    );
  loading$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  constructor(
    private menuService: MenuService,
    private dialog: MatDialog,
    private clipboard: Clipboard,
    private notificationService: NotificationService,
  ) { }

  ngOnInit() {
    this.loading$.next(true);
  }

  openMenuEditDialog(id: number): void {
    this.dialog.closeAll();
    this.dialog.open(MenuEditDialogComponent, {data: {id}})
  }

  handleImageError(event: ErrorEvent) {
    (event.target as HTMLImageElement).src = 'assets/empty-image.jpg';
    (event.target as HTMLImageElement).alt = 'No Image Available';
  }

  shareMenu(menu: Menu) {
    const randomNumber = Math.floor(Math.random() * 6);
    const shareMenuMessages = [
      `Hey food lover! Check out this delightful menu I found. Click the link below to explore all the tempting dishes: [See more...](http://localhost:4200/menu-list?menuId=${menu.id})`,
      `Greetings! I'm thrilled to share this amazing menu filled with delicious options. Dive into the details by following the link below: [See more...](http://localhost:4200/menu-list?menuId=${menu.id})`,
      `Hello there! I just discovered this incredible menu with a variety of mouthwatering dishes, and I couldn't wait to share it with you. Delve into the specifics using the link provided: [See more...](http://localhost:4200/menu-list?menuId=${menu.id})`,
      `Hi foodie! I've got an impressive menu to introduce to you. Discover all the delightful options by clicking on the link below: [See more...](http://localhost:4200/menu-list?menuId=${menu.id})`,
      `Hey! Look at this fantastic menu I just stumbled upon. To find out more about the delicious offerings, simply follow the link below: [See more...](http://localhost:4200/menu-list?menuId=${menu.id})`,
      `Good day! I found this amazing menu featuring a variety of delectable dishes. Follow the link to explore the culinary wonders: [See more...](http://localhost:4200/menu-list?menuId=${menu.id})`,
      `Greetings, fellow food enthusiast! Get ready for a culinary journey with this impressive menu. Click the link below to unravel the flavors: [See more...](http://localhost:4200/menu-list?menuId=${menu.id})`,
      `Hi there! I've discovered a menu filled with mouthwatering options. Don't miss out on the delicious details. Follow this link: [See more...](http://localhost:4200/menu-list?menuId=${menu.id})`,
      `Hello, foodie friend! I've got a treat for you—a fabulous menu with a variety of tempting dishes. Follow the link to indulge your taste buds: [See more...](http://localhost:4200/menu-list?menuId=${menu.id})`,
      `Salutations! Brace yourself for a delightful dining experience with this exquisite menu. Click the link below to savor every dish: [See more...](http://localhost:4200/menu-list?menuId=${menu.id})`
    ];


    this.clipboard.copy(shareMenuMessages[randomNumber]);
    this.notificationService.showSuccessNotification('Recipe have been processed into clipboard. Feel free to share it!')
  }
}
