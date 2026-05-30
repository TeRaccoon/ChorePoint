import { TitleCasePipe } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Chore } from '../../../core/types/dtos/chore';
import { Kid } from '../../../core/types/dtos/kid';

@Component({
  selector: 'app-chore-card',
  imports: [TitleCasePipe, RouterLink],
  templateUrl: './chore-card.html',
  styleUrl: './chore-card.scss',
})
export class ChoreCard {
  @Input() chores!: Chore[];
  @Input() kidsDictionary!: Record<number, Kid>;
  @Input() timeframe!: 'daily' | 'weekly' | 'bonus';

  @Output() deleteEmitter = new EventEmitter<Chore>();
  @Output() toggleActiveEmitter = new EventEmitter<Chore>();

  menuOpen = -1;

  toggleMenu(choreId: number) {
    this.menuOpen = this.menuOpen === choreId ? -1 : choreId;
  }

  toggleActive(chore: Chore) {
    this.toggleActiveEmitter.emit(chore);
  }

  delete(chore: Chore) {
    this.deleteEmitter.emit(chore);
  }
}
