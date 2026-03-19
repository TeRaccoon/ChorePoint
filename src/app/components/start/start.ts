import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CreateProfile } from './children/create-profile/create-profile';
import { GetStarted } from './children/get-started/get-started';
import { HowItWorks } from './children/how-it-works/how-it-works';
import { Welcome } from './children/welcome/welcome';

@Component({
  selector: 'app-start',
  imports: [HowItWorks, Welcome, CreateProfile, GetStarted],
  templateUrl: './start.html',
  styleUrl: './start.scss',
})
export class Start {
  slide = 1;
  totalSlides = 4;

  constructor(private router: Router) {}

  nextSlide() {
    if (this.slide < this.totalSlides) {
      this.slide++;
    } else {
      this.router.navigate(['/dashboard']);
    }
  }

  prevSlide() {
    if (this.slide > 1) this.slide--;
  }

  skipTutorial() {
    this.router.navigate(['/dashboard']);
  }
}
