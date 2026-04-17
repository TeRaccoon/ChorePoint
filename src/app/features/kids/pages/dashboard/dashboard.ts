import { Component } from '@angular/core';
import { CardImage } from '../../../../shared/components/card-image/card-image';
import { ItemView } from '../../../chores/components/item-view/item-view';

@Component({
  selector: 'app-dashboard',
  imports: [CardImage, ItemView],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.scss',
})
export class Dashboard {
  user: any = {
    username: 'Zach',
    points: 1500,
  };

  shopItems: any[] = [
    {
      name: 'Minecraft DLC',
      cost: 5000,
      description: 'Any DLC of your choosing. Maximum value of £5',
    },
    {
      name: '3D printer',
      cost: 100000,
      description: 'A Bambu lab A1 3D printer',
    },
    {
      name: 'Hoodie',
      cost: 17500,
      description: 'Any hoodie of your choosing. Maximum value of £17.50',
    },
  ];

  itemViewVisible = false;
  selectedItem: any | null = null;

  showItemView(item: any) {
    this.itemViewVisible = true;
    this.selectedItem = item;
  }
}
