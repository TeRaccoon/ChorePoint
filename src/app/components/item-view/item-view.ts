import { Component, Input } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faX } from '@fortawesome/free-solid-svg-icons';
import { ShopItem } from '../types';

@Component({
  selector: 'app-item-view',
  imports: [FontAwesomeModule],
  templateUrl: './item-view.html',
  styleUrl: './item-view.scss',
})
export class ItemView {
  @Input() item!: ShopItem;
  @Input() balance = 0;

  xIcon = faX;

  purchaseEnabled = this.item && this.item.cost >= this.balance;
  warningVisible = false;

  purchase() {
    if (!this.purchaseEnabled) {
      this.warningVisible = true;
    }
  }
}
