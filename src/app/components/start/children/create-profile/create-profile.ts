import { Component, EventEmitter, Output } from '@angular/core';
import { AVATARS } from '../../../../consts/avatars';

@Component({
  selector: 'app-create-profile',
  imports: [],
  templateUrl: './create-profile.html',
  styleUrl: './create-profile.scss',
})
export class CreateProfile {
  @Output() nextSlideEvent = new EventEmitter<void>();
  @Output() prevSlideEvent = new EventEmitter<void>();

  avatars = AVATARS;
  selectedAvatar: string = this.avatars[0];

  selectAvatar(avatar: string) {
    this.selectedAvatar = avatar;
  }

  nextSlide() {
    this.nextSlideEvent.emit();
  }

  prevSlide() {
    this.prevSlideEvent.emit();
  }
}
