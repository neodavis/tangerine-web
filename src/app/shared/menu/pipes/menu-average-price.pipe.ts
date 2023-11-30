import { Pipe, PipeTransform } from '@angular/core';

import { Menu } from '../models';

@Pipe({
  name: 'getMenuAveragePrice'
})
export class MenuAveragePricePipe implements PipeTransform {
  transform(menu: Menu): number {
    return menu.recipes
      .reduce((acc, recipe) => acc += recipe.productsCost, 0)
      / menu.recipes.length
  }
}
