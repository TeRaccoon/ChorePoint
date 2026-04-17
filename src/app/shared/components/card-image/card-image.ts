import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-card-image',
  imports: [],
  templateUrl: './card-image.html',
  styleUrl: './card-image.scss',
})
export class CardImage {
  @Input() imageSource: string = 'reward.png';
  @Input() caption!: string;
  @Input() description!: string;
  @Input() cost: number = 0;
}
